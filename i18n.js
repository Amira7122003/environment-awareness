/* ============================================================
   ENVIRONMENTAL AWARENESS WEBSITE  |  i18n.js
   English / Arabic translation dictionary + language switcher.

   - TRANSLATIONS holds every static string used by data-i18n /
     data-i18n-placeholder attributes in index.html.
   - QUIZ_DATA_I18N holds the quiz question bank for each language.
   - initLanguage() wires up the toggle button, restores the saved
     language from localStorage, and applies it with a fade
     transition (dir, lang attribute, fonts, and all text).
============================================================ */

'use strict';

const LANG_STORAGE_KEY = 'ecoaware-lang';

/* ====================================================
   TRANSLATION DICTIONARY
==================================================== */
const TRANSLATIONS = {
    en: {
        brand: {
            name: 'EcoAware'
        },
        meta: {
            title: 'EcoAware | Protect Our Environment'
        },
        nav: {
            home: 'Home', about: 'Introduction', problems: 'Problems', solutions: 'Solutions',
            stats: 'Stats', tips: 'Tips', videos: 'Videos',
            quiz: 'Quiz', contact: 'Contact'
        },
        hero: {
            badge: '🌿 Join the Movement',
           titlePrefix: 'A Green Footprint for a Sustainable Future:',
           titleHighlight: 'Towards a Safe Environment for Future Generations',
            subtitle: 'Every action counts. Together we can preserve the beauty of our planet for future generations. Start your journey to a greener tomorrow today.',
            learnMore: 'Learn More',
            takeQuiz: 'Take the Quiz'
        },
        about: {
            badge: 'About Us',
            title: 'What is Environmental Awareness?',
            subtitle: 'Understanding our impact on the planet is the first step to change',
            imageBadge: 'Our Planet Needs You',
            text1: 'Environmental awareness refers to the understanding and consciousness of environmental challenges and the impact of human activities on the natural world. It encompasses knowledge about ecological systems, pollution, climate change, and sustainable practices.',
            text2: 'By becoming environmentally aware, individuals can make informed choices that reduce their ecological footprint and contribute to a healthier planet for all living beings — now and for generations to come.',
            feature1Title: 'Sustainable Living',
            feature1Desc: 'Adopt eco-friendly habits in daily life',
            feature2Title: 'Responsible Consumption',
            feature2Desc: 'Reduce, reuse, and recycle resources',
            feature3Title: 'Community Action',
            feature3Desc: 'Work together for environmental protection',
            feature4Title: 'Education & Awareness',
            feature4Desc: 'Spread knowledge about environmental issues',
            creatorsHeading: 'Meet the Devolpers',
            creatorBadge: 'Devolpers',
            creator1Desc: 'Information system student , interested in the enviroment and promoting enviroment awareness ',
            creator2Desc: 'Information system student , interested in environmental sustainability and building creative web applications.',
            fieldCS: 'Information System'
        },
        users:{
            user1:'Amira Mahmoud Mohamed',
            user2:'Bassmala Essam Shaaban',
            user3:'Amal Khaled Mahmoud',
            user4:'Eman Sayed Abdelaal',
            user5:'Mahmoud Mohsen Rady',
            user6:'Mahmoud Mohamed Zayed',
            user7:'Nour Elaraby Abdelsalam',
            user8:'Mahmoud Abdelnabi Ezzat',
            user9:'Mohamed Emam Saad',
            user10:'Ahmed Amer Abdeltwaab',
            user11:'Youssef Mohamed Ahmed'
        },
        problems: {
            badge: 'Challenges',
            title: 'Environmental Problems We Face',
            subtitle: 'Understanding these challenges is the key to finding lasting solutions',
            air:     { title: 'Air Pollution',   desc: 'Toxic gases and particles released by vehicles and industries contaminate the air we breathe, causing respiratory diseases and accelerating climate change.', stat: 'deaths / year' },
            water:   { title: 'Water Pollution', desc: 'Industrial waste, agricultural runoff, and plastic dumping contaminate rivers, lakes, and oceans, threatening marine life and human health worldwide.', stat: 'lack clean water' },
            plastic: { title: 'Plastic Waste',   desc: 'Millions of tons of plastic enter our environment each year, breaking down into microplastics that contaminate soil, water sources, and the food chain.', stat: 'tons in oceans / yr' },
            climate: { title: 'Climate Change',  desc: 'Rising global temperatures caused by greenhouse gases are producing extreme weather events, melting ice caps, and rising sea levels that threaten coastlines.', stat: 'avg. temp rise' },
            forest:  { title: 'Deforestation',   desc: 'Forests are cleared at alarming rates for agriculture and development, destroying biodiversity, disrupting ecosystems, and releasing massive amounts of stored carbon.', stat: 'trees cut / year' }
        },
        solutions: {
            badge: 'Solutions',
            title: 'What We Can Do',
            subtitle: 'Small changes in our daily habits can create massive positive impact for our planet',
            recycling:     { title: 'Recycling',        desc: 'Sort and recycle waste materials to reduce landfill waste and conserve natural resources. Every bottle, can, and paper sheet counts toward a cleaner future.', tip1: 'Separate recyclables from regular trash', tip2: 'Use recycling bins at home and work', tip3: 'Buy products made with recycled content' },
            water:         { title: 'Saving Water',     desc: 'Conserve water through mindful usage and quickly fixing leaks. Fresh water is a precious and limited resource that demands our protection every single day.', tip1: 'Take shorter showers (5 min target)', tip2: 'Fix leaky faucets promptly', tip3: 'Collect rainwater for garden plants' },
            trees:         { title: 'Planting Trees',   desc: 'Trees absorb CO₂, produce oxygen, and provide vital habitat for wildlife. Planting trees is one of the most effective and accessible ways to fight climate change.', tip1: 'Plant native trees in your yard', tip2: 'Join local community planting events', tip3: 'Support reforestation organisations' },
            renewable:     { title: 'Renewable Energy', desc: 'Switching to solar, wind, and other renewable sources reduces dependence on fossil fuels and cuts greenhouse gas emissions that drive climate change significantly.', tip1: 'Install solar panels at home', tip2: 'Choose a green energy provider', tip3: 'Use energy-efficient appliances' },
            reducePlastic: { title: 'Reducing Plastic', desc: 'Single-use plastics are a major environmental hazard. Reducing plastic consumption protects our oceans, wildlife, and the entire food chain from contamination.', tip1: 'Use reusable bags, cups, and bottles', tip2: 'Refuse single-use plastic items', tip3: 'Choose plastic-free packaging' }
        },
        statistics: {
            badge: 'Our Impact',
            title: 'Environmental Statistics',
            subtitle: 'Numbers that show why we must act — and why our actions matter',
            trees:    { label: 'Trees Planted',    desc: 'Through global reforestation efforts', suffix: '+' },
            plastic:  { label: 'Plastic Recycled', desc: 'Diverted from landfills and oceans', suffix: 'kg' },
            co2:      { label: 'CO₂ Reduced',      desc: 'Tons of emissions prevented', suffix: 't' },
            warriors: { label: 'Eco Warriors',     desc: 'People committed to positive change', suffix: '+' }
        },
        tips: {
            badge: 'Daily Habits',
            title: 'Eco-Friendly Tips',
            subtitle: 'Simple actions you can take every day to help protect our environment',
            walk:   { title: 'Walk or Cycle',      desc: 'Choose walking or cycling for short trips instead of driving. This reduces carbon emissions and improves your cardiovascular health at the same time.' },
            energy: { title: 'Save Energy',        desc: 'Turn off lights and unplug electronics when not in use. Switch to LED bulbs — they use up to 80% less energy than traditional incandescent bulbs.' },
            plant:  { title: 'Eat Plant-Based',     desc: 'Reduce meat consumption and eat more plant-based foods. Animal agriculture is responsible for nearly 15% of global greenhouse gas emissions.' },
            shop:   { title: 'Shop Sustainably',    desc: 'Buy second-hand items, choose eco-friendly products, and support businesses with sustainable practices, ethical sourcing, and minimal packaging.' },
            water:  { title: 'Conserve Water',      desc: 'Take shorter showers, turn off taps while brushing teeth, and water plants during cooler times of day to minimise evaporation and conserve precious freshwater.' },
            share:  { title: 'Spread Awareness',    desc: 'Share environmental knowledge with friends, family, and on social media. Educating others multiplies our collective positive impact exponentially.' }
        },
        videos: {
            badge: 'Watch & Learn',
            title: 'Featured Videos',
            subtitle: 'Learn from leading voices in environmental education and action',
            tag1: 'Environmental Awareness',
            tag2: 'Recycling',
            tag3: 'Climate Change',
            watchLink: 'Watch on YouTube',
            video1: { title: 'Climate Change 101 with Bill Nye', desc: 'National Geographic breaks down the causes and effects of climate change with engaging visuals and expert commentary.' },
            video2: { title: 'How Plastic Recycling Really Works', desc: 'Discover the full journey of recycled plastics — from collection to processing — and learn how smarter habits help.' },
            video3: { title: 'Climate 101: Cause and Effect', desc: 'An in-depth look at the primary drivers of climate change, cascading effects on ecosystems, and what we can do now.' }
        },
        quiz: {
            badge: 'Test Yourself',
            title: 'Environmental Awareness Quiz',
            subtitle: 'How much do you know about protecting our planet? Find out now!',
            questionOf: 'Question {current} of {total}',
            complete: 'Quiz Complete!',
            next: 'Next Question',
            seeResults: 'See Results',
            correct: 'Correct!',
            incorrect: 'Incorrect.',
            retake: 'Retake Quiz',
            outOf: '/ {total}',
            resultPerfect: 'Perfect score! You are a true environmental champion. Share your knowledge and inspire others!',
            resultExcellent: 'Excellent! You have outstanding environmental awareness. Keep spreading the green message!',
            resultGood: 'Good effort! You know the basics well. Explore more of our website to sharpen your eco-knowledge.',
            resultOk: 'Not bad! There is room to grow. Check out our Problems, Solutions, and Tips sections to learn more.',
            resultLow: 'Every expert starts somewhere! Read through our website to boost your environmental knowledge.'
        },
        contact: {
            badge: 'Get In Touch',
            title: 'Contact Us',
            subtitle: 'Have questions or want to get involved? We would love to hear from you!',
            workTogetherTitle: "Let's Work Together",
            workTogetherDesc: 'Join our mission to protect the environment. Whether you have questions, ideas, or want to volunteer, reach out to us and become part of the change.',
            locationLabel: 'Location',
            locationValue: 'Egypt, Cairo, El Mokattam',
            emailLabel: 'Email',
            phoneLabel: 'Phone',
            form: {
                nameLabel: 'Full Name',
                namePlaceholder: 'Enter your full name',
                emailLabel: 'Email Address',
                emailPlaceholder: 'Enter your email address',
                subjectLabel: 'Subject',
                subjectPlaceholder: 'Select a subject',
                subjectOption1: 'Volunteer Opportunities',
                subjectOption2: 'Partnership & Sponsorship',
                subjectOption3: 'Education Programs',
                subjectOption4: 'Donations',
                subjectOption5: 'Other',
                messageLabel: 'Message',
                messagePlaceholder: 'Write your message here...',
                submit: 'Send Message',
                sending: 'Sending…',
                successMsg: "Thank you! Your message has been sent successfully. We'll get back to you within 24 hours."
            },
            errors: {
                nameRequired: 'Please enter your full name.',
                nameLength: 'Name must be at least 2 characters long.',
                emailRequired: 'Please enter your email address.',
                emailInvalid: 'Please enter a valid email address (e.g. user@example.com).',
                subjectRequired: 'Please select a subject from the list.',
                messageRequired: 'Please enter your message.',
                messageLength: 'Message must be at least 10 characters long.'
            }
        },
        footer: {
            brandDesc: 'Dedicated to raising environmental awareness and inspiring everyday action for a sustainable, thriving future for all life on Earth.',
            quickLinksTitle: 'Quick Links',
            resourcesTitle: 'Resources',
            linkTips: 'Eco Tips',
            linkQuiz: 'Take Quiz',
            linkStats: 'Statistics',
            newsletterTitle: 'Stay Updated',
            newsletterDesc: 'Subscribe to our newsletter for the latest eco news, tips, and events delivered to your inbox.',
            newsletterPlaceholder: 'Enter your email',
            newsletterBtn: 'Subscribe',
            newsletterSending: '…',
            newsletterSuccess: '✓ You have been subscribed! Thank you.',
            newsletterErrEmpty: 'Please enter your email address.',
            newsletterErrInvalid: 'Please enter a valid email address.',
            copyright: '© 2024 EcoAware. All rights reserved. Made with',
            copyrightSuffix: 'for our planet.',
            privacy: 'Privacy Policy',
            terms: 'Terms of Service',
            cookies: 'Cookie Policy'
        }
    },

    ar: {
        brand: {
            name: 'الوعي البيئي'
        },
        meta: {
            title: 'الوعي البيئي | احمِ بيئتنا'
        },
        nav: {
            home: 'الرئيسية', about: 'المقدمة', problems: 'المشاكل', solutions: 'الحلول',
            stats: 'إحصائيات', tips: 'نصائح', videos: 'فيديوهات',
            quiz: 'اختبار', contact: 'تواصل'
        },
        hero: {
            badge: '🌿 انضم إلى الحركة',
             titlePrefix: 'بصمة خضراء لمستقبل مستدام:',
             titleHighlight: 'نحو بيئة آمنة للأجيال القادمة',
            subtitle: 'كل تصرف له قيمة. معًا يمكننا الحفاظ على جمال كوكبنا للأجيال القادمة. ابدأ رحلتك نحو غدٍ أكثر خضرة اليوم.',
            learnMore: 'اعرف المزيد',
            takeQuiz: 'ابدأ الاختبار'
        },
        about: {
            badge: 'من نحن',
            title: 'ما هو الوعي البيئي؟',
            subtitle: 'فهم تأثيرنا على الكوكب هو الخطوة الأولى نحو التغيير',
            imageBadge: 'كوكبنا بحاجة إليك',
            text1: 'يشير الوعي البيئي إلى فهم وإدراك التحديات البيئية وتأثير الأنشطة البشرية على العالم الطبيعي. ويشمل ذلك المعرفة بالنظم البيئية والتلوث وتغير المناخ والممارسات المستدامة.',
            text2: 'من خلال اكتساب الوعي البيئي، يمكن للأفراد اتخاذ قرارات واعية تقلل من بصمتهم البيئية وتساهم في كوكب أكثر صحة لجميع الكائنات الحية — الآن وللأجيال القادمة.',
            feature1Title: 'حياة مستدامة',
            feature1Desc: 'تبنَّ عادات صديقة للبيئة في حياتك اليومية',
            feature2Title: 'استهلاك مسؤول',
            feature2Desc: 'قلّل، أعد الاستخدام، ودوّر الموارد',
            feature3Title: 'العمل المجتمعي',
            feature3Desc: 'تعاونوا معًا من أجل حماية البيئة',
            feature4Title: 'التعليم والتوعية',
            feature4Desc: 'انشر المعرفة حول القضايا البيئية',
            creatorsHeading: 'تعرف على المطورون',
            creatorBadge: 'المطور',
            creator1Desc: 'طالب نظم معلومات ، مهتم بالبيئة ونشر الوعي البيئي',
            creator2Desc: 'طالب نظم معلومات، مهتم بالاستدامة البيئية وبناء تطبيقات ويب إبداعية',
            fieldCS:'نظم المعلومات'
        },
        users:{
            user1:'اميره محمود محمد',
            user2: 'بسملة عصام شعبان',
            user3: 'آمال خالد محمود',
            user4: 'إيمان سيد عبد العال',
            user5: 'محمود محسن راضي',
            user6: 'محمود محمد زايد',
            user7: 'نور العربي عبد السلام',
            user8: 'محمود عبد النبي عزت',
            user9: 'محمد إمام سعد',
            user10: 'أحمد عامر عبد التواب',
            user11: 'يوسف محمد أحمد'

        },
        problems: {
            badge: 'التحديات',
            title: 'المشاكل البيئية التي نواجهها',
            subtitle: 'فهم هذه التحديات هو مفتاح إيجاد حلول دائمة',
            air:     { title: 'تلوث الهواء',   desc: 'الغازات والجسيمات السامة الصادرة عن المركبات والمصانع تلوّث الهواء الذي نتنفسه، مما يسبب أمراضًا تنفسية ويسرّع من تغير المناخ.', stat: 'وفاة / سنويًا' },
            water:   { title: 'تلوث المياه',   desc: 'النفايات الصناعية والجريان الزراعي وإلقاء البلاستيك تلوّث الأنهار والبحيرات والمحيطات، مما يهدد الحياة البحرية وصحة الإنسان في جميع أنحاء العالم.', stat: 'يفتقرون لمياه نظيفة' },
            plastic: { title: 'النفايات البلاستيكية', desc: 'تدخل ملايين الأطنان من البلاستيك إلى بيئتنا كل عام، وتتحلل إلى جسيمات دقيقة تلوّث التربة ومصادر المياه والسلسلة الغذائية.', stat: 'طن في المحيطات / سنويًا' },
            climate: { title: 'تغير المناخ',   desc: 'ارتفاع درجات الحرارة العالمية بسبب الغازات الدفيئة يؤدي إلى ظواهر جوية متطرفة، وذوبان الجليد القطبي، وارتفاع مستوى سطح البحر مما يهدد السواحل.', stat: 'ارتفاع متوسط الحرارة' },
            forest:  { title: 'إزالة الغابات', desc: 'تُزال الغابات بمعدلات مثيرة للقلق من أجل الزراعة والتنمية، مما يدمر التنوع البيولوجي ويعطّل النظم البيئية ويطلق كميات هائلة من الكربون المخزَّن.', stat: 'شجرة تُقطع / سنويًا' }
        },
        solutions: {
            badge: 'الحلول',
            title: 'ما الذي يمكننا فعله',
            subtitle: 'التغييرات الصغيرة في عاداتنا اليومية يمكن أن تُحدث أثرًا إيجابيًا هائلًا لكوكبنا',
            recycling:     { title: 'إعادة التدوير', desc: 'افرز وأعد تدوير مواد النفايات لتقليل النفايات في المكبات والحفاظ على الموارد الطبيعية. كل زجاجة وعلبة وورقة تُحدث فرقًا نحو مستقبل أنظف.', tip1: 'افصل المواد القابلة لإعادة التدوير عن النفايات العادية', tip2: 'استخدم صناديق إعادة التدوير في المنزل والعمل', tip3: 'اشترِ منتجات مصنوعة من محتوى مُعاد تدويره' },
            water:         { title: 'توفير المياه', desc: 'حافظ على المياه من خلال الاستخدام الواعي وإصلاح التسريبات بسرعة. المياه العذبة مورد ثمين ومحدود يتطلب حمايتنا كل يوم.', tip1: 'خذ استحمامًا أقصر (بهدف 5 دقائق)', tip2: 'أصلح الصنابير المتسربة فورًا', tip3: 'اجمع مياه الأمطار لري النباتات' },
            trees:         { title: 'زراعة الأشجار', desc: 'تمتص الأشجار ثاني أكسيد الكربون وتنتج الأكسجين وتوفر موطنًا حيويًا للحياة البرية. زراعة الأشجار من أكثر الطرق فعالية وسهولة لمكافحة تغير المناخ.', tip1: 'ازرع أشجارًا محلية في حديقتك', tip2: 'انضم إلى فعاليات الزراعة المجتمعية المحلية', tip3: 'ادعم منظمات إعادة التشجير' },
            renewable:     { title: 'الطاقة المتجددة', desc: 'التحول إلى الطاقة الشمسية والرياح ومصادر متجددة أخرى يقلل الاعتماد على الوقود الأحفوري ويخفض انبعاثات الغازات الدفيئة التي تدفع تغير المناخ بشكل كبير.', tip1: 'ركّب ألواحًا شمسية في منزلك', tip2: 'اختر مزود طاقة خضراء', tip3: 'استخدم أجهزة موفرة للطاقة' },
            reducePlastic: { title: 'تقليل البلاستيك', desc: 'المواد البلاستيكية أحادية الاستخدام تشكل خطرًا بيئيًا كبيرًا. تقليل استهلاك البلاستيك يحمي محيطاتنا وحياتنا البرية وسلسلتنا الغذائية بأكملها من التلوث.', tip1: 'استخدم أكياسًا وأكوابًا وزجاجات قابلة لإعادة الاستخدام', tip2: 'ارفض المواد البلاستيكية أحادية الاستخدام', tip3: 'اختر تغليفًا خاليًا من البلاستيك' }
        },
        statistics: {
            badge: 'تأثيرنا',
            title: 'إحصائيات بيئية',
            subtitle: 'أرقام تُظهر لماذا يجب أن نتحرك — ولماذا تُحدث أفعالنا فرقًا',
            trees:    { label: 'أشجار مزروعة',            desc: 'من خلال جهود إعادة التشجير العالمية', suffix: '+' },
            plastic:  { label: 'بلاستيك مُعاد تدويره',    desc: 'تم تحويله بعيدًا عن المكبات والمحيطات', suffix: 'كغ' },
            co2:      { label: 'ثاني أكسيد الكربون المخفَّض', desc: 'أطنان من الانبعاثات تم منعها', suffix: 'طن' },
            warriors: { label: 'أنصار البيئة',            desc: 'أشخاص ملتزمون بالتغيير الإيجابي', suffix: '+' }
        },
        tips: {
            badge: 'عادات يومية',
            title: 'نصائح صديقة للبيئة',
            subtitle: 'إجراءات بسيطة يمكنك اتخاذها كل يوم للمساعدة في حماية بيئتنا',
            walk:   { title: 'امشِ أو استخدم الدراجة', desc: 'اختر المشي أو ركوب الدراجة للرحلات القصيرة بدلًا من القيادة. هذا يقلل الانبعاثات الكربونية ويحسّن صحة قلبك في الوقت نفسه.' },
            energy: { title: 'وفّر الطاقة',            desc: 'أطفئ الأضواء وافصل الأجهزة الكهربائية عند عدم استخدامها. استخدم مصابيح LED — فهي تستهلك طاقة أقل بنسبة تصل إلى 80% من المصابيح التقليدية.' },
            plant:  { title: 'تناول طعامًا نباتيًا',   desc: 'قلّل من استهلاك اللحوم وتناول المزيد من الأطعمة النباتية. تُسبب تربية الماشية ما يقارب 15% من انبعاثات الغازات الدفيئة العالمية.' },
            shop:   { title: 'تسوّق بوعي',             desc: 'اشترِ سلعًا مستعملة، واختر منتجات صديقة للبيئة، وادعم الشركات ذات الممارسات المستدامة والتوريد الأخلاقي والتغليف البسيط.' },
            water:  { title: 'حافظ على المياه',        desc: 'خذ استحمامًا أقصر، وأغلق الصنبور أثناء تنظيف أسنانك، واسقِ النباتات في أوقات النهار الأكثر برودة لتقليل التبخر والحفاظ على المياه العذبة الثمينة.' },
            share:  { title: 'انشر الوعي',             desc: 'شارك المعرفة البيئية مع الأصدقاء والعائلة وعلى وسائل التواصل الاجتماعي. تثقيف الآخرين يضاعف أثرنا الإيجابي الجماعي بشكل كبير.' }
        },
        videos: {
            badge: 'شاهد وتعلم',
            title: 'فيديوهات مميزة',
            subtitle: 'تعلم من أبرز الأصوات في التعليم والعمل البيئي',
            tag1: 'الوعي البيئي',
            tag2: 'إعادة التدوير',
            tag3: 'تغير المناخ',
            watchLink: 'شاهد على يوتيوب',
            video1: { title: 'تغير المناخ 101 مع بيل ناي', desc: 'تشرح ناشيونال جيوغرافيك أسباب وتأثيرات تغير المناخ بمرئيات جذابة وتعليقات من خبراء.' },
            video2: { title: 'كيف تتم إعادة تدوير البلاستيك فعليًا', desc: 'اكتشف الرحلة الكاملة للبلاستيك المُعاد تدويره — من الجمع إلى المعالجة — وتعرّف على كيفية مساعدة العادات الأذكى.' },
            video3: { title: 'المناخ 101: السبب والنتيجة', desc: 'نظرة معمقة على الدوافع الرئيسية لتغير المناخ، وتأثيراته المتتالية على النظم البيئية، وما يمكننا فعله الآن.' }
        },
        quiz: {
            badge: 'اختبر نفسك',
            title: 'اختبار الوعي البيئي',
            subtitle: 'كم تعرف عن حماية كوكبنا؟ اكتشف الآن!',
            questionOf: 'السؤال {current} من {total}',
            complete: 'اكتمل الاختبار!',
            next: 'السؤال التالي',
            seeResults: 'عرض النتائج',
            correct: 'إجابة صحيحة!',
            incorrect: 'إجابة خاطئة.',
            retake: 'أعد الاختبار',
            outOf: '/ {total}',
            resultPerfect: 'نتيجة مثالية! أنت بطل بيئي حقيقي. شارك معرفتك وألهم الآخرين!',
            resultExcellent: 'ممتاز! لديك وعي بيئي رائع. استمر في نشر الرسالة الخضراء!',
            resultGood: 'مجهود جيد! أنت تعرف الأساسيات جيدًا. استكشف المزيد من موقعنا لتعزيز معرفتك البيئية.',
            resultOk: 'لا بأس! هناك مجال للتحسن. اطّلع على أقسام المشاكل والحلول والنصائح لمعرفة المزيد.',
            resultLow: 'كل خبير بدأ من مكان ما! تصفّح موقعنا لتعزيز معرفتك البيئية.'
        },
        contact: {
            badge: 'تواصل معنا',
            title: 'تواصل معنا',
            subtitle: 'هل لديك أسئلة أو ترغب في المشاركة؟ يسعدنا أن نسمع منك!',
            workTogetherTitle: 'لنعمل معًا',
            workTogetherDesc: 'انضم إلى مهمتنا لحماية البيئة. سواء كانت لديك أسئلة أو أفكار أو ترغب في التطوع، تواصل معنا وكن جزءًا من التغيير.',
            locationLabel: 'الموقع',
            locationValue: 'مصر، القاهرة، المقطم',
            emailLabel: 'البريد الإلكتروني',
            phoneLabel: 'الهاتف',
            form: {
                nameLabel: 'الاسم الكامل',
                namePlaceholder: 'أدخل اسمك الكامل',
                emailLabel: 'البريد الإلكتروني',
                emailPlaceholder: 'أدخل بريدك الإلكتروني',
                subjectLabel: 'الموضوع',
                subjectPlaceholder: 'اختر موضوعًا',
                subjectOption1: 'فرص التطوع',
                subjectOption2: 'الشراكة والرعاية',
                subjectOption3: 'البرامج التعليمية',
                subjectOption4: 'التبرعات',
                subjectOption5: 'أخرى',
                messageLabel: 'الرسالة',
                messagePlaceholder: 'اكتب رسالتك هنا...',
                submit: 'إرسال الرسالة',
                sending: 'جارٍ الإرسال…',
                successMsg: 'شكرًا لك! تم إرسال رسالتك بنجاح. سنتواصل معك خلال 24 ساعة.'
            },
            errors: {
                nameRequired: 'يرجى إدخال اسمك الكامل.',
                nameLength: 'يجب أن يتكون الاسم من حرفين على الأقل.',
                emailRequired: 'يرجى إدخال بريدك الإلكتروني.',
                emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح (مثال: user@example.com).',
                subjectRequired: 'يرجى اختيار موضوع من القائمة.',
                messageRequired: 'يرجى إدخال رسالتك.',
                messageLength: 'يجب أن تتكون الرسالة من 10 أحرف على الأقل.'
            }
        },
        footer: {
            brandDesc: 'مكرّسون لرفع الوعي البيئي وإلهام العمل اليومي من أجل مستقبل مستدام ومزدهر لكل الكائنات الحية على الأرض.',
            quickLinksTitle: 'روابط سريعة',
            resourcesTitle: 'مصادر',
            linkTips: 'نصائح بيئية',
            linkQuiz: 'ابدأ الاختبار',
            linkStats: 'إحصائيات',
            newsletterTitle: 'ابقَ على اطلاع',
            newsletterDesc: 'اشترك في نشرتنا البريدية لأحدث الأخبار والنصائح والفعاليات البيئية في بريدك الإلكتروني.',
            newsletterPlaceholder: 'أدخل بريدك الإلكتروني',
            newsletterBtn: 'اشترك',
            newsletterSending: '…',
            newsletterSuccess: '✓ تم اشتراكك بنجاح! شكرًا لك.',
            newsletterErrEmpty: 'يرجى إدخال بريدك الإلكتروني.',
            newsletterErrInvalid: 'يرجى إدخال بريد إلكتروني صحيح.',
            copyright: '© 2024 إيكو أوير. جميع الحقوق محفوظة. صُنع بحب',
            copyrightSuffix: 'من أجل كوكبنا.',
            privacy: 'سياسة الخصوصية',
            terms: 'شروط الخدمة',
            cookies: 'سياسة ملفات تعريف الارتباط'
        }
    }
};

/* ====================================================
   QUIZ QUESTION BANK (per language)
==================================================== */
const QUIZ_DATA_I18N = {
    en: [
        {
            question: 'Which gas is the primary driver of human-caused climate change?',
            options: ['Oxygen (O₂)', 'Carbon Dioxide (CO₂)', 'Nitrogen (N₂)', 'Hydrogen (H₂)'],
            correct: 1,
            explanation: 'Carbon Dioxide (CO₂) is the dominant greenhouse gas released by burning fossil fuels, deforestation, and cement production.'
        },
        {
            question: 'Approximately how many trees are cut down globally every year?',
            options: ['1 billion', '5 billion', '15 billion', '50 billion'],
            correct: 2,
            explanation: 'Scientists estimate roughly 15 billion trees are felled each year, with a net loss of about 10 billion after replanting.'
        },
        {
            question: 'What fraction of Earth\'s water is freshwater accessible for human use?',
            options: ['Less than 1 %', 'About 3 %', 'About 10 %', 'About 25 %'],
            correct: 0,
            explanation: 'Less than 1 % of all water on Earth is both fresh and readily accessible — most freshwater is frozen in glaciers or trapped underground.'
        },
        {
            question: 'How long does a typical single-use plastic bottle take to decompose?',
            options: ['10 – 20 years', '50 – 80 years', '200 – 450 years', 'Over 1 000 years'],
            correct: 2,
            explanation: 'A standard PET plastic bottle takes 200 – 450 years to break down, releasing harmful microplastics throughout that time.'
        },
        {
            question: 'Which renewable energy source is currently growing fastest worldwide?',
            options: ['Wind Energy', 'Hydropower', 'Geothermal Energy', 'Solar Energy'],
            correct: 3,
            explanation: 'Solar energy is expanding faster than any other energy source globally, driven by rapidly falling panel costs and supportive government policies.'
        }
    ],
    ar: [
        {
            question: 'ما هو الغاز الرئيسي المسبب لتغير المناخ الناتج عن النشاط البشري؟',
            options: ['الأكسجين (O₂)', 'ثاني أكسيد الكربون (CO₂)', 'النيتروجين (N₂)', 'الهيدروجين (H₂)'],
            correct: 1,
            explanation: 'ثاني أكسيد الكربون (CO₂) هو الغاز الدفيء المهيمن الناتج عن حرق الوقود الأحفوري وإزالة الغابات وإنتاج الأسمنت.'
        },
        {
            question: 'كم شجرة تُقطع تقريبًا في العالم كل عام؟',
            options: ['مليار', '5 مليارات', '15 مليار', '50 مليار'],
            correct: 2,
            explanation: 'يقدّر العلماء أن نحو 15 مليار شجرة تُقطع كل عام، بخسارة صافية تبلغ نحو 10 مليارات بعد إعادة الزراعة.'
        },
        {
            question: 'ما هي نسبة المياه العذبة على الأرض المتاحة للاستخدام البشري؟',
            options: ['أقل من 1 %', 'نحو 3 %', 'نحو 10 %', 'نحو 25 %'],
            correct: 0,
            explanation: 'أقل من 1 % فقط من كل المياه على الأرض عذبة ومتاحة بسهولة — معظم المياه العذبة متجمدة في الأنهار الجليدية أو محبوسة تحت الأرض.'
        },
        {
            question: 'كم من الوقت تستغرق زجاجة بلاستيكية عادية أحادية الاستخدام لتتحلل؟',
            options: ['10 – 20 عامًا', '50 – 80 عامًا', '200 – 450 عامًا', 'أكثر من 1000 عام'],
            correct: 2,
            explanation: 'تستغرق زجاجة PET البلاستيكية القياسية من 200 إلى 450 عامًا لتتحلل، وتطلق جسيمات بلاستيكية دقيقة ضارة طوال ذلك الوقت.'
        },
        {
            question: 'ما هو مصدر الطاقة المتجددة الذي ينمو بأسرع وتيرة حاليًا في العالم؟',
            options: ['طاقة الرياح', 'الطاقة الكهرومائية', 'الطاقة الحرارية الجوفية', 'الطاقة الشمسية'],
            correct: 3,
            explanation: 'تتوسع الطاقة الشمسية بشكل أسرع من أي مصدر طاقة آخر عالميًا، مدفوعة بانخفاض سريع في تكاليف الألواح وسياسات حكومية داعمة.'
        }
    ]
};

/* ====================================================
   HELPERS
==================================================== */

/** Get the currently active language ('en' or 'ar'). */
function getCurrentLang() {
    return document.documentElement.getAttribute('lang') === 'ar' ? 'ar' : 'en';
}

/**
 * Get the BCP-47 locale to use for Number/Date formatting for the
 * current language — 'ar-EG' renders digits as Eastern Arabic
 * numerals (٠١٢٣...), matching the requested Arabic statistics.
 */
function getNumberLocale() {
    return getCurrentLang() === 'ar' ? 'ar-EG' : 'en-US';
}

/**
 * Format a number using the current language's digit style.
 * @param {number} value
 * @returns {string}
 */
function formatNumber(value) {
    return value.toLocaleString(getNumberLocale());
}

/**
 * Look up a translated string by dot-path key, e.g. t('nav.home').
 * Falls back to the key itself if not found, and supports
 * simple {placeholder} substitution via the `vars` argument.
 * @param {string} key
 * @param {Object} [vars]
 * @returns {string}
 */
function t(key, vars) {
    const lang = getCurrentLang();
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    let value = key.split('.').reduce((obj, part) => (obj && obj[part] !== undefined ? obj[part] : undefined), dict);

    if (value === undefined) return key;

    if (vars) {
        Object.keys(vars).forEach(k => {
            value = value.replace(new RegExp(`\\{${k}\\}`, 'g'), vars[k]);
        });
    }
    return value;
}

/** Return the active quiz question bank for the current language. */
function getQuizData() {
    return QUIZ_DATA_I18N[getCurrentLang()];
}

/**
 * Apply every data-i18n / data-i18n-placeholder translation found
 * in the DOM for the given language, plus the document title.
 */
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });
    document.title = t('meta.title');
}

/**
 * Switch the active language: updates <html lang/dir>, persists the
 * choice, re-applies all translations with a smooth fade transition,
 * and notifies the rest of the app (quiz, forms) to refresh.
 * @param {string} lang - 'en' or 'ar'
 */
function setLanguage(lang) {
    const html = document.documentElement;
    const langToggle = document.getElementById('langToggle');

    // Fade the page out, swap content while invisible, fade back in.
    document.body.classList.add('lang-fade');

    setTimeout(() => {
        html.setAttribute('lang', lang);
        html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

        applyTranslations();

        if (langToggle) {
            langToggle.classList.toggle('lang-is-ar', lang === 'ar');
            langToggle.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
        }

        // Let other modules (quiz, contact form) react to the change.
        document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));

        // Fade back in. requestAnimationFrame gives the smoothest result,
        // but it can be suspended in background/inactive tabs, so fall
        // back to a plain timeout to guarantee the page is never left
        // stuck invisible.
        if (typeof requestAnimationFrame === 'function') {
            requestAnimationFrame(() => document.body.classList.remove('lang-fade'));
        }
        setTimeout(() => document.body.classList.remove('lang-fade'), 50);
    }, 220);

    localStorage.setItem(LANG_STORAGE_KEY, lang);
}

/** Wire up the toggle button and restore the saved language on load. */
function initLanguage() {
    const langToggle = document.getElementById('langToggle');
    const saved = localStorage.getItem(LANG_STORAGE_KEY) || 'en';

    // Apply the saved language immediately (no fade on first load).
    document.documentElement.setAttribute('lang', saved);
    document.documentElement.setAttribute('dir', saved === 'ar' ? 'rtl' : 'ltr');
    applyTranslations();
    if (langToggle) langToggle.classList.toggle('lang-is-ar', saved === 'ar');

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const next = getCurrentLang() === 'ar' ? 'en' : 'ar';
            setLanguage(next);
        });
    }
}
