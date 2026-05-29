/**
 * NEBians Internationalization (i18n) Framework
 * 
 * Provides Nepali (ne) and English (en) language support.
 * Default is English. Nepali translations can be activated.
 * 
 * Usage:
 *   import { t, setLanguage, getLanguage } from '@/lib/i18n';
 *   t('welcome_message'); // "Welcome back" or "स्वागत छ"
 */

export type Language = 'en' | 'ne';

let currentLanguage: Language = 'en';

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Common
    welcome_message: 'Welcome back',
    welcome_subtitle: 'Continue where you left off or explore new resources.',
    loading: 'Loading...',
    error: 'Something went wrong',
    retry: 'Retry',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    download: 'Download',
    share: 'Share',
    bookmark: 'Bookmark',
    like: 'Like',
    comment: 'Comment',
    answer: 'Answer',
    ask_question: 'Ask Question',
    post: 'Post',
    submit: 'Submit',
    continue: 'Continue',
    back: 'Back',
    next: 'Next',
    done: 'Done',
    
    // Navigation
    home: 'Home',
    resources: 'Resources',
    forum: 'Forum',
    notifications: 'Notifications',
    settings: 'Settings',
    profile: 'Profile',
    logout: 'Log Out',
    login: 'Log In',
    register: 'Register',
    
    // Subjects
    subject_physics: 'Physics',
    subject_chemistry: 'Chemistry',
    subject_mathematics: 'Mathematics',
    subject_biology: 'Biology',
    subject_english: 'English',
    subject_nepali: 'Nepali',
    subject_social_studies: 'Social Studies',
    subject_computer_science: 'Computer Science',
    subject_accountancy: 'Accountancy',
    subject_economics: 'Economics',
    subject_optional_mathematics: 'Optional Maths',
    subject_science: 'Science',
    
    // Grades
    grade_10: 'Grade 10',
    grade_11: 'Class 11',
    grade_12: 'Class 12',
    grade_both: 'Both/Passout',
    
    // Resource Types
    type_textbook: 'Textbook',
    type_notes: 'Notes',
    type_past_paper: 'Past Paper',
    type_practice_set: 'Practice Set',
    
    // Landing Page
    landing_hero_title: 'Study Smarter, Anywhere in Nepal',
    landing_hero_subtitle: 'The only offline-first study platform built for Nepali NEB students. Download notes, past papers, and practice sets.',
    landing_cta_start: 'Start Studying Free',
    landing_cta_browse: 'Browse Resources',
    landing_feature_offline: 'Works Offline',
    landing_feature_offline_desc: 'Download resources at school WiFi. Study at home without internet. Perfect for load-shedding and rural Nepal.',
    landing_feature_content: 'NEB-Aligned Content',
    landing_feature_content_desc: 'Notes, past papers, and practice sets organized by your exact grade, stream, and subject. Teacher-verified accuracy.',
    landing_feature_community: 'Student Community',
    landing_feature_community_desc: 'Ask questions, share knowledge, and help fellow students in the discussion forum.',
    landing_feature_annotation: 'PDF Annotation',
    landing_feature_annotation_desc: 'Highlight, underline, and add sticky notes to your study materials.',
    landing_how_it_works: 'How NEBians Works',
    landing_step_1: 'Download',
    landing_step_1_desc: 'Save notes, past papers, and practice sets to your phone when you have internet.',
    landing_step_2: 'Study Offline',
    landing_step_2_desc: 'Read, highlight, and annotate — even during load-shedding or in areas with no signal.',
    landing_step_3: 'Ask & Share',
    landing_step_3_desc: 'Stuck on a problem? Ask the community. Know the answer? Help a fellow student.',
    landing_pricing_title: 'Free to Start. Affordable to Grow.',
    landing_pricing_subtitle: 'Start with our free tier. Upgrade when you are ready.',
    landing_plan_free: 'Free',
    landing_plan_pro: 'Pro',
    landing_plan_school: 'School',
    landing_price_free: 'NPR 0',
    landing_price_pro: 'NPR 99/month',
    landing_price_school: 'NPR 2,999/year',
    landing_faq_title: 'Frequently Asked Questions',
    landing_faq_offline: 'Does NEBians really work without internet?',
    landing_faq_offline_answer: 'Yes. Download resources when you have WiFi or data. Once downloaded, you can read, highlight, and annotate them completely offline.',
    landing_faq_syllabus: 'Is the content aligned with the NEB syllabus?',
    landing_faq_syllabus_answer: 'Absolutely. Our content is sourced from and verified by active NEB teachers.',
    landing_faq_cost: 'Do I need to pay to use NEBians?',
    landing_faq_cost_answer: 'No. The free tier gives you access to 70% of all resources. You only need Pro if you want unlimited downloads and advanced features.',
    
    // Auth
    auth_welcome: 'Welcome to NEBians',
    auth_login_prompt: 'Log in to access your study materials',
    auth_register_prompt: 'Create your free account',
    auth_email: 'Email',
    auth_password: 'Password',
    auth_name: 'Full Name',
    auth_grade: 'Grade',
    auth_stream: 'Stream',
    auth_school: 'School',
    auth_district: 'District',
    auth_have_account: 'Already have an account?',
    auth_no_account: "Don't have an account?",
    
    // Forum
    forum_title: 'Discussion Forum',
    forum_subtitle: 'Ask questions, share knowledge, and help fellow students.',
    forum_search_placeholder: 'Search questions...',
    forum_no_results: 'No questions found',
    forum_be_first: 'Be the first to ask a question!',
    forum_sort_newest: 'Newest',
    forum_sort_most_liked: 'Most Liked',
    forum_sort_unanswered: 'Unanswered',
    forum_answers: 'answers',
    
    // Resources
    resources_title: 'Resources',
    resources_subtitle: 'Browse textbooks, notes, past papers, and practice sets.',
    resources_search_placeholder: 'Search resources...',
    resources_no_results: 'No resources found',
    resources_try_adjusting: 'Try adjusting your filters or search terms.',
    resources_subject_filter: 'Subject',
    resources_grade_filter: 'Grade',
    resources_type_filter: 'Type',
    resources_recent: 'Recent Resources',
    resources_view_all: 'View all',
    
    // Notifications
    notifications_title: 'Notifications',
    notifications_empty: 'No notifications yet',
    notifications_mark_read: 'Mark as read',
    
    // Settings
    settings_title: 'Settings',
    settings_theme: 'Theme',
    settings_language: 'Language',
    settings_notifications: 'Notifications',
    settings_storage: 'Storage',
    settings_about: 'About NEBians',
    settings_version: 'Version',
    
    // Offline
    offline_banner: 'You are offline. Downloaded content is still available.',
    online_banner: 'Back online. Syncing your changes...',
    
    // Errors
    error_loading: 'Failed to load. Please try again.',
    error_network: 'Network error. Check your connection.',
    error_not_found: 'Page not found.',
  },
  
  ne: {
    // Common
    welcome_message: 'स्वागत छ',
    welcome_subtitle: 'जहाँ छोड्नुभयो त्यहीँबाट जारी राख्नुहोस् वा नयाँ स्रोतहरू अन्वेषण गर्नुहोस्।',
    loading: 'लोड हुँदैछ...',
    error: 'केही गडबड भयो',
    retry: 'पुनः प्रयास गर्नुहोस्',
    cancel: 'रद्द गर्नुहोस्',
    save: 'सुरक्षित गर्नुहोस्',
    delete: 'मेटाउनुहोस्',
    edit: 'सम्पादन गर्नुहोस्',
    close: 'बन्द गर्नुहोस्',
    search: 'खोज्नुहोस्',
    filter: 'फिल्टर',
    sort: 'क्रमबद्ध गर्नुहोस्',
    download: 'डाउनलोड गर्नुहोस्',
    share: 'साझा गर्नुहोस्',
    bookmark: 'बुकमार्क गर्नुहोस्',
    like: 'मन पर्छ',
    comment: 'टिप्पणी',
    answer: 'जवाफ',
    ask_question: 'प्रश्न सोध्नुहोस्',
    post: 'पोस्ट गर्नुहोस्',
    submit: 'पेश गर्नुहोस्',
    continue: 'जारी राख्नुहोस्',
    back: 'पछाडि',
    next: 'अर्को',
    done: 'सकियो',
    
    // Navigation
    home: 'गृहपृष्ठ',
    resources: 'स्रोतहरू',
    forum: 'फोरम',
    notifications: 'सूचनाहरू',
    settings: 'सेटिङ्स',
    profile: 'प्रोफाइल',
    logout: 'लग आउट',
    login: 'लग इन',
    register: 'दर्ता गर्नुहोस्',
    
    // Subjects
    subject_physics: 'भौतिक विज्ञान',
    subject_chemistry: 'रसायन विज्ञान',
    subject_mathematics: 'गणित',
    subject_biology: 'जीव विज्ञान',
    subject_english: 'अंग्रेजी',
    subject_nepali: 'नेपाली',
    subject_social_studies: 'सामाजिक अध्ययन',
    subject_computer_science: 'कम्प्युटर विज्ञान',
    subject_accountancy: 'लेखा',
    subject_economics: 'अर्थशास्त्र',
    subject_optional_mathematics: 'वैकल्पिक गणित',
    subject_science: 'विज्ञान',
    
    // Grades
    grade_10: 'कक्षा १०',
    grade_11: 'कक्षा ११',
    grade_12: 'कक्षा १२',
    grade_both: 'दुवै/पासआउट',
    
    // Resource Types
    type_textbook: 'पाठ्यपुस्तक',
    type_notes: 'नोट्स',
    type_past_paper: 'पुरानो प्रश्नपत्र',
    type_practice_set: 'अभ्यास सेट',
    
    // Landing Page
    landing_hero_title: 'नेपालको कुनै पनि ठाउँबाट बुद्धिमानीपूर्वक अध्ययन गर्नुहोस्',
    landing_hero_subtitle: 'नेपाली NEB विद्यार्थीहरूका लागि बनाइएको एकमात्र अफलाइन-पहिलो अध्ययन प्लेटफर्म। नोट्स, पुराना प्रश्नपत्र, र अभ्यास सेटहरू डाउनलोड गर्नुहोस्।',
    landing_cta_start: 'निःशुल्क अध्ययन सुरु गर्नुहोस्',
    landing_cta_browse: 'स्रोतहरू हेर्नुहोस्',
    landing_feature_offline: 'अफलाइनमा काम गर्छ',
    landing_feature_offline_desc: 'विद्यालयको WiFi मा स्रोतहरू डाउनलोड गर्नुहोस्। इन्टरनेट बिना घरमा अध्ययन गर्नुहोस्।',
    landing_feature_content: 'NEB-अनुमोदित सामग्री',
    landing_feature_content_desc: 'नोट्स, पुराना प्रश्नपत्र, र अभ्यास सेटहरू तपाईंको कक्षा र विषय अनुसार व्यवस्थित।',
    landing_feature_community: 'विद्यार्थी समुदाय',
    landing_feature_community_desc: 'प्रश्न सोध्नुहोस्, ज्ञान साझा गर्नुहोस्, र अन्य विद्यार्थीहरूलाई मद्दत गर्नुहोस्।',
    landing_feature_annotation: 'PDF टिप्पणी',
    landing_feature_annotation_desc: 'तपाईंको अध्ययन सामग्रीमा हाइलाइट, अन्डरलाइन, र स्टिकी नोटहरू थप्नुहोस्।',
    landing_how_it_works: 'NEBians कसरी काम गर्छ',
    landing_step_1: 'डाउनलोड गर्नुहोस्',
    landing_step_1_desc: 'इन्टरनेट हुँदा तपाईंको फोनमा नोट्स, पुराना प्रश्नपत्र, र अभ्यास सेटहरू सुरक्षित गर्नुहोस्।',
    landing_step_2: 'अफलाइन अध्ययन गर्नुहोस्',
    landing_step_2_desc: 'लोड-शेडिङ वा सिग्नल नभएका क्षेत्रमा पनि पढ्नुहोस्, हाइलाइट गर्नुहोस्, र टिप्पणी गर्नुहोस्।',
    landing_step_3: 'सोध्नुहोस् र साझा गर्नुहोस्',
    landing_step_3_desc: 'समस्यामा अड्कनुभयो? समुदायलाई सोध्नुहोस्। जवाफ थाहा छ? अरूलाई मद्दत गर्नुहोस्।',
    landing_pricing_title: 'निःशुल्क सुरु गर्नुहोस्। वृद्धि गर्दा सस्तो।',
    landing_pricing_subtitle: 'हाम्रो निःशुल्क टियरसँग सुरु गर्नुहोस्। तयार हुँदा अपग्रेड गर्नुहोस्।',
    landing_plan_free: 'निःशुल्क',
    landing_plan_pro: 'प्रो',
    landing_plan_school: 'विद्यालय',
    landing_price_free: 'रु ०',
    landing_price_pro: 'रु ९९/महिना',
    landing_price_school: 'रु २,९९९/वर्ष',
    landing_faq_title: 'प्रायः सोधिने प्रश्नहरू',
    landing_faq_offline: 'के NEBians साँच्चै इन्टरनेट बिना काम गर्छ?',
    landing_faq_offline_answer: 'हो। WiFi वा डाटा हुँदा स्रोतहरू डाउनलोड गर्नुहोस्। एक पटक डाउनलोड भएपछि, तपाईं पूर्ण रूपमा अफलाइनमा पढ्न, हाइलाइट गर्न, र टिप्पणी गर्न सक्नुहुन्छ।',
    landing_faq_syllabus: 'के सामग्री NEB पाठ्यक्रम अनुसार छ?',
    landing_faq_syllabus_answer: 'पक्कै पनि। हाम्रो सामग्री सक्रिय NEB शिक्षकहरूद्वारा प्रमाणित छ।',
    landing_faq_cost: 'के NEBians प्रयोग गर्न म पैसा तिर्नुपर्छ?',
    landing_faq_cost_answer: 'होइन। निःशुल्क टियरले तपाईंलाई सबै स्रोतहरूको ७०% पहुँच दिन्छ।',
    
    // Auth
    auth_welcome: 'NEBians मा स्वागत छ',
    auth_login_prompt: 'तपाईंको अध्ययन सामग्री पहुँच गर्न लग इन गर्नुहोस्',
    auth_register_prompt: 'तपाईंको निःशुल्क खाता बनाउनुहोस्',
    auth_email: 'इमेल',
    auth_password: 'पासवर्ड',
    auth_name: 'पूरा नाम',
    auth_grade: 'कक्षा',
    auth_stream: 'संकाय',
    auth_school: 'विद्यालय',
    auth_district: 'जिल्ला',
    auth_have_account: 'पहिले नै खाता छ?',
    auth_no_account: 'खाता छैन?',
    
    // Forum
    forum_title: 'छलफल फोरम',
    forum_subtitle: 'प्रश्न सोध्नुहोस्, ज्ञान साझा गर्नुहोस्, र अन्य विद्यार्थीहरूलाई मद्दत गर्नुहोस्।',
    forum_search_placeholder: 'प्रश्नहरू खोज्नुहोस्...',
    forum_no_results: 'कुनै प्रश्न फेला परेन',
    forum_be_first: 'पहिलो प्रश्न सोध्ने व्यक्ति बन्नुहोस्!',
    forum_sort_newest: 'नयाँ',
    forum_sort_most_liked: 'सर्वाधिक मनपर्ने',
    forum_sort_unanswered: 'नजवाफिएको',
    forum_answers: 'जवाफहरू',
    
    // Resources
    resources_title: 'स्रोतहरू',
    resources_subtitle: 'पाठ्यपुस्तक, नोट्स, पुराना प्रश्नपत्र, र अभ्यास सेटहरू हेर्नुहोस्।',
    resources_search_placeholder: 'स्रोतहरू खोज्नुहोस्...',
    resources_no_results: 'कुनै स्रोत फेला परेन',
    resources_try_adjusting: 'तपाईंको फिल्टर वा खोज शब्दहरू समायोजन गर्नुहोस्।',
    resources_subject_filter: 'विषय',
    resources_grade_filter: 'कक्षा',
    resources_type_filter: 'प्रकार',
    resources_recent: 'हालका स्रोतहरू',
    resources_view_all: 'सबै हेर्नुहोस्',
    
    // Notifications
    notifications_title: 'सूचनाहरू',
    notifications_empty: 'अहिलेसम्म कुनै सूचना छैन',
    notifications_mark_read: 'पढिएको रूपमा चिन्ह लगाउनुहोस्',
    
    // Settings
    settings_title: 'सेटिङ्स',
    settings_theme: 'थिम',
    settings_language: 'भाषा',
    settings_notifications: 'सूचनाहरू',
    settings_storage: 'भण्डारण',
    settings_about: 'NEBians बारे',
    settings_version: 'संस्करण',
    
    // Offline
    offline_banner: 'तपाईं अफलाइन हुनुहुन्छ। डाउनलोड गरिएको सामग्री अझै उपलब्ध छ।',
    online_banner: 'अनलाइन फर्कनुभयो। तपाईंको परिवर्तनहरू सिङ्क हुँदैछ...',
    
    // Errors
    error_loading: 'लोड गर्न असफल। कृपया पुनः प्रयास गर्नुहोस्।',
    error_network: 'नेटवर्क त्रुटि। आफ्नो जडान जाँच गर्नुहोस्।',
    error_not_found: 'पृष्ठ फेला परेन।',
  },
};

/**
 * Get translated string for the current language
 */
export function t(key: string, fallback?: string): string {
  const lang = translations[currentLanguage];
  return lang[key] ?? fallback ?? key;
}

/**
 * Set the current language
 */
export function setLanguage(lang: Language): void {
  currentLanguage = lang;
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;
  }
}

/**
 * Get the current language
 */
export function getLanguage(): Language {
  return currentLanguage;
}

/**
 * Get all available languages
 */
export function getAvailableLanguages(): { code: Language; name: string; nativeName: string }[] {
  return [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ne', name: 'Nepali', nativeName: 'नेपाली' },
  ];
}
