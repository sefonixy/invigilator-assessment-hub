import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Language resources
const resources = {
  en: {
    translation: {
      // Navigation & Layout
      title: 'Invigilator Assessment Hub',
      footer: 'Invigilator Assessment Hub ©2024 - Built with React & Ant Design',
      
      // Welcome Section
      welcome: {
        title: 'Welcome to React + Ant Design',
        description: 'Your project is now configured with Ant Design components. Click the buttons below to test the integration.',
        editMessage: 'Edit src/App.tsx and start building your assessment hub!'
      },
      
      // Interactive Demo
      demo: {
        title: 'Interactive Demo',
        countButton: 'Count: {{count}}',
        notificationButton: 'Show Notification',
        readyTitle: 'Ready to Build'
      },
      
      // Notifications
      notifications: {
        success: 'Success!',
        successDescription: 'Ant Design is working perfectly!',
        languageChanged: 'Language Changed',
        languageChangedDescription: 'Interface language has been updated to {{language}}',
        profileUpdated: 'Profile Updated',
        profileUpdatedDescription: 'Your profile has been successfully updated.'
      },
      
      // Settings
      settings: {
        language: 'Language',
        theme: 'Theme',
        light: 'Light',
        dark: 'Dark'
      },
      
      // Languages
      languages: {
        english: 'English',
        arabic: 'Arabic'
      },

      // Profile Section
      profile: {
        title: 'User Profile',
        personalInfo: 'Personal Information',
        preferences: 'Preferences',
        actions: 'Actions',
        
        // Form Fields
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email Address',
        phone: 'Phone Number',
        role: 'Role',
        department: 'Department',
        bio: 'Bio',
        
        // Role Options
        roles: {
          admin: 'Administrator',
          invigilator: 'Invigilator',
          supervisor: 'Supervisor',
          coordinator: 'Coordinator'
        },

        // Placeholders
        placeholders: {
          firstName: 'Enter your first name',
          lastName: 'Enter your last name',
          email: 'Enter your email address',
          phone: 'Enter your phone number',
          bio: 'Tell us about yourself...'
        },

        // Buttons
        buttons: {
          save: 'Save Changes',
          cancel: 'Cancel',
          close: 'Close',
          edit: 'Edit Profile',
          changePassword: 'Change Password',
          logout: 'Logout'
        }
      }
    }
  },
  ar: {
    translation: {
      // Navigation & Layout
      title: 'مركز تقييم المراقبين',
      footer: 'مركز تقييم المراقبين ©2024 - مبني باستخدام React و Ant Design',
      
      // Welcome Section
      welcome: {
        title: 'مرحباً بكم في React + Ant Design',
        description: 'تم تكوين مشروعكم باستخدام مكونات Ant Design. انقروا على الأزرار أدناه لاختبار التكامل.',
        editMessage: 'عدّلوا src/App.tsx وابدأوا في بناء مركز التقييم الخاص بكم!'
      },
      
      // Interactive Demo
      demo: {
        title: 'عرض تفاعلي',
        countButton: 'العدد: {{count}}',
        notificationButton: 'إظهار الإشعار',
        readyTitle: 'جاهز للبناء'
      },
      
      // Notifications
      notifications: {
        success: 'نجح!',
        successDescription: 'Ant Design يعمل بشكل مثالي!',
        languageChanged: 'تم تغيير اللغة',
        languageChangedDescription: 'تم تحديث لغة الواجهة إلى {{language}}',
        profileUpdated: 'تم تحديث الملف الشخصي',
        profileUpdatedDescription: 'تم تحديث ملفكم الشخصي بنجاح.'
      },
      
      // Settings
      settings: {
        language: 'اللغة',
        theme: 'المظهر',
        light: 'فاتح',
        dark: 'داكن'
      },
      
      // Languages
      languages: {
        english: 'الإنجليزية',
        arabic: 'العربية'
      },

      // Profile Section
      profile: {
        title: 'الملف الشخصي',
        personalInfo: 'المعلومات الشخصية',
        preferences: 'التفضيلات',
        actions: 'الإجراءات',
        
        // Form Fields
        firstName: 'الاسم الأول',
        lastName: 'اسم العائلة',
        email: 'عنوان البريد الإلكتروني',
        phone: 'رقم الهاتف',
        role: 'الدور',
        department: 'القسم',
        bio: 'نبذة تعريفية',
        
        // Role Options
        roles: {
          admin: 'مدير النظام',
          invigilator: 'مراقب',
          supervisor: 'مشرف',
          coordinator: 'منسق'
        },

        // Placeholders
        placeholders: {
          firstName: 'أدخل اسمكم الأول',
          lastName: 'أدخل اسم العائلة',
          email: 'أدخل عنوان البريد الإلكتروني',
          phone: 'أدخل رقم الهاتف',
          bio: 'حدثونا عن أنفسكم...'
        },

        // Buttons
        buttons: {
          save: 'حفظ التغييرات',
          cancel: 'إلغاء',
          close: 'إغلاق',
          edit: 'تعديل الملف الشخصي',
          changePassword: 'تغيير كلمة المرور',
          logout: 'تسجيل الخروج'
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false // react already does escaping
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n; 