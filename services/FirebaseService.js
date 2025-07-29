import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc
} from 'firebase/firestore';
import { auth, db } from './firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

class FirebaseService {
  // User Registration
  async registerUser(userData) {
    try {
      const { email, password, name, phone, userType = 'user' } = userData;
      
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        phone,
        email,
        userType,
        createdAt: new Date().toISOString(),
        isActive: true
      });

      // Save to local storage for offline access
      await AsyncStorage.setItem('userType', userType);
      await AsyncStorage.setItem('userData', JSON.stringify({
        uid: user.uid,
        name,
        email,
        userType
      }));

      return {
        success: true,
        user: user,
        data: { name, email, userType }
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // User Login
  async loginUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();

      // Save to local storage
      await AsyncStorage.setItem('userType', userData.userType);
      await AsyncStorage.setItem('userData', JSON.stringify({
        uid: user.uid,
        ...userData
      }));

      return {
        success: true,
        user: user,
        data: userData
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Volunteer Login
  async loginVolunteer(email, password) {
    try {
      // First authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user is a volunteer in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();

      if (userData.userType !== 'volunteer') {
        await signOut(auth);
        return {
          success: false,
          error: 'Access denied. Volunteer credentials required.'
        };
      }

      // Save volunteer data to local storage
      await AsyncStorage.setItem('userType', 'volunteer');
      await AsyncStorage.setItem('volunteerData', JSON.stringify({
        uid: user.uid,
        ...userData
      }));

      return {
        success: true,
        volunteer: userData,
        user: user
      };
    } catch (error) {
      console.error('Volunteer login error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get Current User
  async getCurrentUser() {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        return {
          success: true,
          user: user,
          data: userData
        };
      } else {
        // Check local storage
        const localUserData = await AsyncStorage.getItem('userData');
        if (localUserData) {
          return {
            success: true,
            user: null,
            data: JSON.parse(localUserData)
          };
        }
        return {
          success: false,
          error: 'No user found'
        };
      }
    } catch (error) {
      console.error('Get current user error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Logout
  async logout() {
    try {
      await signOut(auth);
      await AsyncStorage.multiRemove(['userType', 'userData', 'volunteerData']);
      return {
        success: true
      };
    } catch (error) {
      console.error('Logout error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Clear all data
  async clearAllData() {
    try {
      if (auth.currentUser) {
        await signOut(auth);
      }
      await AsyncStorage.multiRemove(['userType', 'userData', 'volunteerData']);
      return {
        success: true
      };
    } catch (error) {
      console.error('Clear data error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Check if user is registered (local check first)
  async isUserRegistered() {
    try {
      const userData = await AsyncStorage.getItem('userData');
      return userData !== null;
    } catch (error) {
      console.error('Check registration error:', error);
      return false;
    }
  }

  // Get user type
  async getUserType() {
    try {
      return await AsyncStorage.getItem('userType');
    } catch (error) {
      console.error('Get user type error:', error);
      return null;
    }
  }
}

export const firebaseService = new FirebaseService();
export default firebaseService;
