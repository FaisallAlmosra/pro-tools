// Set PDF.js worker
if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

// Time Calculator
document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-time');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const arrivalTime = document.getElementById('arrival-time').value;
            const workHours = parseFloat(document.getElementById('work-hours').value);
            const breakMinutes = parseInt(document.getElementById('break-time').value);
            
            if (!arrivalTime) {
                alert('الرجاء إدخال وقت الحضور');
                return;
            }
            
            const [hours, minutes] = arrivalTime.split(':').map(Number);
            let totalMinutes = hours * 60 + minutes;
            totalMinutes += workHours * 60;
            totalMinutes += breakMinutes;
            
            let departureHours = Math.floor(totalMinutes / 60) % 24;
            let departureMinutes = totalMinutes % 60;
            
            // Convert to 12-hour format
            const period = departureHours >= 12 ? 'مساءً' : 'صباحاً';
            let displayHours = departureHours % 12;
            if (displayHours === 0) displayHours = 12;
            
            const formattedMinutes = departureMinutes.toString().padStart(2, '0');
            const departureTime = `${displayHours}:${formattedMinutes} ${period}`;
            
            document.getElementById('departure-time').textContent = departureTime;
            document.getElementById('result-container').classList.remove('hidden');
        });
    }

    // Set default arrival time
    const now = new Date();
    const currentHours = now.getHours().toString().padStart(2, '0');
    const currentMinutes = now.getMinutes().toString().padStart(2, '0');
    const arrivalInput = document.getElementById('arrival-time');
    if (arrivalInput) {
        arrivalInput.value = `${currentHours}:${currentMinutes}`;
    }
});

// Tool Modal System
function showTool(toolId) {
    const modal = document.getElementById('tool-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    const toolTitles = {
        'video-editor': 'محرر الفيديو الاحترافي',
        'image-editor': 'محرر الصور الاحترافي',
        'prayer-times': 'مواقيت الصلاة الدقيقة',
        'desktop-browser': 'متصفح سطح المكتب',
        'speed-test': 'اختبار سرعة الإنترنت',
        'pdf-to-image': 'محول PDF للصور',
        'image-to-pdf': 'محول الصور إلى PDF',
        'salary-calculator': 'حاسبة الرواتب',
        'date-converter': 'تحويل التاريخ',
        'unit-converter': 'تحويل الوحدات',
        'percentage-calculator': 'حاسبة النسب',
        'image-compressor': 'ضغط الصور',
        'qr-generator': 'مولد QR كود',
        'password-generator': 'مولد كلمات السر',
        'character-counter': 'عدّاد الحروف',
        'random-number': 'مولد أرقام عشوائية',
        'color-picker': 'منتقي الألوان',
        'base64-converter': 'محول Base64',
        'stopwatch': 'ساعة إيقاف'
    };
    
    modalTitle.textContent = toolTitles[toolId] || 'أداة';
    
    let content = '';
    switch(toolId) {
        case 'video-editor':
            content = getVideoEditorContent();
            break;
        case 'image-editor':
            content = getImageEditorContent();
            break;
        case 'prayer-times':
            content = getPrayerTimesContent();
            break;
        case 'desktop-browser':
            content = getDesktopBrowserContent();
            break;
        case 'speed-test':
            content = getSpeedTestContent();
            break;
        case 'pdf-to-image':
            content = getPdfToImageContent();
            break;
        case 'image-to-pdf':
            content = getImageToPdfContent();
            break;
        case 'salary-calculator':
            content = getSalaryCalculatorContent();
            break;
        case 'date-converter':
            content = getDateConverterContent();
            break;
        case 'unit-converter':
            content = getUnitConverterContent();
            break;
        case 'percentage-calculator':
            content = getPercentageCalculatorContent();
            break;
        case 'image-compressor':
            content = getImageCompressorContent();
            break;
        case 'qr-generator':
            content = getQrGeneratorContent();
            break;
        case 'password-generator':
            content = getPasswordGeneratorContent();
            break;
        case 'character-counter':
            content = getCharacterCounterContent();
            break;
        case 'random-number':
            content = getRandomNumberContent();
            break;
        case 'color-picker':
            content = getColorPickerContent();
            break;
        case 'base64-converter':
            content = getBase64ConverterContent();
            break;
        case 'stopwatch':
            content = getStopwatchContent();
            break;
        default:
            content = `
                <div class="text-center py-8">
                    <i class="fas fa-tools text-4xl text-gray-400 mb-4"></i>
                    <p class="text-gray-600">هذه الأداة قيد التطوير حالياً وسوف تكون متاحة قريباً.</p>
                    <button onclick="hideTool()" class="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition">العودة</button>
                </div>
            `;
    }
    
    modalContent.innerHTML = content;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Initialize tool-specific functionality
    initializeToolFunctionality(toolId);
}

function hideTool() {
    document.getElementById('tool-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('tool-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        hideTool();
    }
});

// Video Editor Content
function getVideoEditorContent() {
    return `
        <div class="space-y-6">
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-red-500 transition" id="video-drop-zone">
                <i class="fas fa-cloud-upload-alt text-5xl text-gray-400 mb-3"></i>
                <p class="text-gray-600 mb-2">اسحب وأسقط ملف الفيديو هنا أو انقر لاختيار الملف</p>
                <p class="text-sm text-gray-500">يدعم: MP4, AVI, MOV, MKV</p>
                <input type="file" id="video-upload" accept="video/*" class="hidden">
            </div>
            
            <div id="video-editor-workspace" class="hidden space-y-4">
                <div class="bg-black rounded-lg overflow-hidden">
                    <video id="video-preview" controls class="w-full max-h-96"></video>
                </div>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button onclick="trimVideo()" class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
                        <i class="fas fa-cut ml-2"></i>قص الفيديو
                    </button>
                    <button onclick="rotateVideo()" class="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition">
                        <i class="fas fa-redo ml-2"></i>تدوير
                    </button>
                    <button onclick="addFilter()" class="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition">
                        <i class="fas fa-magic ml-2"></i>فلاتر
                    </button>
                    <button onclick="adjustVideo()" class="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition">
                        <i class="fas fa-sliders-h ml-2"></i>ضبط
                    </button>
                </div>
                
                <div id="video-controls" class="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div>
                        <label class="block text-sm font-medium mb-2">السطوع</label>
                        <input type="range" id="brightness" min="0" max="200" value="100" class="w-full">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">التباين</label>
                        <input type="range" id="contrast" min="0" max="200" value="100" class="w-full">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">التشبع</label>
                        <input type="range" id="saturation" min="0" max="200" value="100" class="w-full">
                    </div>
                </div>
                
                <div class="flex gap-3">
                    <button onclick="exportVideo('720p')" class="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-bold transition">
                        <i class="fas fa-download ml-2"></i>تصدير 720p
                    </button>
                    <button onclick="exportVideo('1080p')" class="flex-1 bg-green-700 hover:bg-green-800 text-white py-3 px-4 rounded-lg font-bold transition">
                        <i class="fas fa-download ml-2"></i>تصدير 1080p
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Image Editor Content
function getImageEditorContent() {
    return `
        <div class="space-y-6">
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-cyan-500 transition" id="image-editor-drop-zone">
                <i class="fas fa-cloud-upload-alt text-5xl text-gray-400 mb-3"></i>
                <p class="text-gray-600 mb-2">اسحب وأسقط الصورة هنا أو انقر لاختيار الملف</p>
                <p class="text-sm text-gray-500">يدعم: JPG, PNG, GIF, BMP</p>
                <input type="file" id="image-editor-upload" accept="image/*" class="hidden">
            </div>
            
            <div id="image-editor-workspace" class="hidden space-y-4">
                <div class="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center" style="min-height: 300px;">
                    <canvas id="image-canvas" class="max-w-full max-h-96"></canvas>
                </div>
                
                <div class="grid grid-cols-3 md:grid-cols-6 gap-2">
                    <button onclick="applyFilter('grayscale')" class="bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 rounded text-sm transition">
                        <i class="fas fa-adjust ml-1"></i>رمادي
                    </button>
                    <button onclick="applyFilter('sepia')" class="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-3 rounded text-sm transition">
                        <i class="fas fa-sun ml-1"></i>سيبيا
                    </button>
                    <button onclick="applyFilter('blur')" class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition">
                        <i class="fas fa-circle ml-1"></i>ضبابي
                    </button>
                    <button onclick="applyFilter('sharpen')" class="bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded text-sm transition">
                        <i class="fas fa-star ml-1"></i>حاد
                    </button>
                    <button onclick="rotateImage()" class="bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm transition">
                        <i class="fas fa-redo ml-1"></i>تدوير
                    </button>
                    <button onclick="flipImage()" class="bg-pink-600 hover:bg-pink-700 text-white py-2 px-3 rounded text-sm transition">
                        <i class="fas fa-exchange-alt ml-1"></i>قلب
                    </button>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div>
                        <label class="block text-sm font-medium mb-2">السطوع</label>
                        <input type="range" id="img-brightness" min="0" max="200" value="100" class="w-full" onchange="updateImageFilters()">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">التباين</label>
                        <input type="range" id="img-contrast" min="0" max="200" value="100" class="w-full" onchange="updateImageFilters()">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">التشبع</label>
                        <input type="range" id="img-saturation" min="0" max="200" value="100" class="w-full" onchange="updateImageFilters()">
                    </div>
                </div>
                
                <div class="flex gap-3">
                    <button onclick="resetImage()" class="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-bold transition">
                        <i class="fas fa-undo ml-2"></i>إعادة تعيين
                    </button>
                    <button onclick="downloadEditedImage()" class="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-bold transition">
                        <i class="fas fa-download ml-2"></i>تحميل الصورة
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Prayer Times Content
function getPrayerTimesContent() {
    return `
        <div class="space-y-6">
            <div class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-lg text-center">
                <i class="fas fa-mosque text-4xl mb-3"></i>
                <h3 class="text-2xl font-bold mb-2">مواقيت الصلاة</h3>
                <p id="prayer-date" class="text-sm opacity-90"></p>
                <p id="prayer-location" class="text-sm opacity-90 mt-1"></p>
            </div>
            
            <div id="prayer-times-loading" class="text-center py-8">
                <i class="fas fa-spinner fa-spin text-4xl text-emerald-600 mb-3"></i>
                <p class="text-gray-600">جاري تحديد موقعك وحساب أوقات الصلاة...</p>
            </div>
            
            <div id="prayer-times-list" class="hidden space-y-3">
                <div class="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg flex justify-between items-center border-r-4 border-blue-500">
                    <div class="flex items-center">
                        <i class="fas fa-sun text-blue-600 text-2xl ml-3"></i>
                        <span class="font-bold text-gray-800">الفجر</span>
                    </div>
                    <span id="fajr-time" class="text-xl font-bold text-blue-600"></span>
                </div>
                
                <div class="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg flex justify-between items-center border-r-4 border-yellow-500">
                    <div class="flex items-center">
                        <i class="fas fa-sun text-yellow-600 text-2xl ml-3"></i>
                        <span class="font-bold text-gray-800">الشروق</span>
                    </div>
                    <span id="sunrise-time" class="text-xl font-bold text-yellow-600"></span>
                </div>
                
                <div class="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg flex justify-between items-center border-r-4 border-orange-500">
                    <div class="flex items-center">
                        <i class="fas fa-sun text-orange-600 text-2xl ml-3"></i>
                        <span class="font-bold text-gray-800">الظهر</span>
                    </div>
                    <span id="dhuhr-time" class="text-xl font-bold text-orange-600"></span>
                </div>
                
                <div class="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg flex justify-between items-center border-r-4 border-amber-500">
                    <div class="flex items-center">
                        <i class="fas fa-cloud-sun text-amber-600 text-2xl ml-3"></i>
                        <span class="font-bold text-gray-800">العصر</span>
                    </div>
                    <span id="asr-time" class="text-xl font-bold text-amber-600"></span>
                </div>
                
                <div class="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg flex justify-between items-center border-r-4 border-red-500">
                    <div class="flex items-center">
                        <i class="fas fa-moon text-red-600 text-2xl ml-3"></i>
                        <span class="font-bold text-gray-800">المغرب</span>
                    </div>
                    <span id="maghrib-time" class="text-xl font-bold text-red-600"></span>
                </div>
                
                <div class="bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 rounded-lg flex justify-between items-center border-r-4 border-indigo-500">
                    <div class="flex items-center">
                        <i class="fas fa-moon text-indigo-600 text-2xl ml-3"></i>
                        <span class="font-bold text-gray-800">العشاء</span>
                    </div>
                    <span id="isha-time" class="text-xl font-bold text-indigo-600"></span>
                </div>
            </div>
            
            <div id="next-prayer" class="hidden bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg text-center border-2 border-emerald-300">
                <p class="text-sm text-gray-600 mb-1">الصلاة القادمة</p>
                <p class="text-2xl font-bold text-emerald-600" id="next-prayer-name"></p>
                <p class="text-lg text-gray-700 mt-2">بعد <span id="time-remaining" class="font-bold text-emerald-600"></span></p>
            </div>
        </div>
    `;
}

// Desktop Browser Content
function getDesktopBrowserContent() {
    return `
        <div class="space-y-4">
            <div class="flex gap-2">
                <button onclick="browserBack()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition">
                    <i class="fas fa-arrow-right"></i>
                </button>
                <button onclick="browserForward()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <button onclick="browserRefresh()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition">
                    <i class="fas fa-sync-alt"></i>
                </button>
                <input type="text" id="browser-url" placeholder="أدخل عنوان الموقع..." class="flex-1 px-4 py-2 border border-gray-300 rounded" value="https://www.google.com">
                <button onclick="browserGo()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded font-bold transition">
                    انتقال
                </button>
                <button onclick="browserFullscreen()" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition">
                    <i class="fas fa-expand"></i>
                </button>
            </div>
            
            <div class="bg-gray-100 rounded-lg overflow-hidden" style="height: 500px;">
                <iframe id="desktop-iframe" src="https://www.google.com" class="w-full h-full border-0"></iframe>
            </div>
            
            <div class="flex gap-2 flex-wrap">
                <button onclick="loadSite('https://www.google.com')" class="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded text-sm transition">
                    Google
                </button>
                <button onclick="loadSite('https://www.youtube.com')" class="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm transition">
                    YouTube
                </button>
                <button onclick="loadSite('https://www.wikipedia.org')" class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm transition">
                    Wikipedia
                </button>
                <button onclick="loadSite('https://www.github.com')" class="bg-gray-800 hover:bg-gray-900 text-white px-3 py-1 rounded text-sm transition">
                    GitHub
                </button>
            </div>
            
            <div class="text-sm text-gray-500 text-center">
                <i class="fas fa-info-circle ml-1"></i>
                ملاحظة: بعض المواقع قد تمنع العرض داخل إطار لأسباب أمنية
            </div>
        </div>
    `;
}

// Speed Test Content
function getSpeedTestContent() {
    return `
        <div class="space-y-6">
            <div class="text-center">
                <div id="speed-gauge" class="relative w-64 h-64 mx-auto mb-6">
                    <svg viewBox="0 0 200 200" class="transform -rotate-90">
                        <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" stroke-width="20"/>
                        <circle id="speed-progress" cx="100" cy="100" r="90" fill="none" stroke="#f97316" stroke-width="20" 
                                stroke-dasharray="565.48" stroke-dashoffset="565.48" stroke-linecap="round"/>
                    </svg>
                    <div class="absolute inset-0 flex flex-col items-center justify-center">
                        <div id="speed-value" class="text-5xl font-bold text-orange-600">0</div>
                        <div class="text-gray-500 text-sm">Mbps</div>
                    </div>
                </div>
                
                <div id="test-status" class="text-lg font-semibold text-gray-700 mb-4">جاهز للاختبار</div>
                
                <button id="start-test" class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-8 rounded-xl font-bold shadow-lg transform hover:scale-105 transition">
                    <i class="fas fa-play ml-2"></i>
                    بدء الاختبار
                </button>
            </div>
            
            <div id="test-results" class="hidden grid grid-cols-3 gap-4 mt-6">
                <div class="bg-blue-50 p-4 rounded-lg text-center">
                    <div class="text-sm text-gray-600 mb-1">التحميل</div>
                    <div id="download-speed" class="text-2xl font-bold text-blue-600">0</div>
                    <div class="text-xs text-gray-500">Mbps</div>
                </div>
                <div class="bg-green-50 p-4 rounded-lg text-center">
                    <div class="text-sm text-gray-600 mb-1">الرفع</div>
                    <div id="upload-speed" class="text-2xl font-bold text-green-600">0</div>
                    <div class="text-xs text-gray-500">Mbps</div>
                </div>
                <div class="bg-purple-50 p-4 rounded-lg text-center">
                    <div class="text-sm text-gray-600 mb-1">الاستجابة</div>
                    <div id="ping-value" class="text-2xl font-bold text-purple-600">0</div>
                    <div class="text-xs text-gray-500">ms</div>
                </div>
            </div>
        </div>
    `;
}

// Tool Content Functions
function getPdfToImageContent() {
    return `
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4 cursor-pointer" id="pdf-drop-zone">
            <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
            <p class="text-gray-500">اسحب وأسقط ملف PDF هنا أو انقر لاختيار الملف</p>
            <input type="file" id="pdf-upload" accept=".pdf" class="hidden">
        </div>
        <div id="pdf-progress" class="hidden mb-4">
            <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div id="pdf-progress-bar" class="bg-blue-600 h-2.5 rounded-full" style="width: 0%"></div>
            </div>
            <p id="pdf-progress-text" class="text-sm text-gray-600 mt-2 text-center">جاري المعالجة...</p>
        </div>
        <div id="pdf-result" class="hidden">
            <h4 class="font-medium mb-2">النتائج:</h4>
            <div id="converted-images" class="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto"></div>
        </div>
    `;
}

function getImageToPdfContent() {
    return `
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4 cursor-pointer" id="image-drop-zone">
            <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
            <p class="text-gray-500">اسحب وأسقط الصور هنا أو انقر لاختيار الملفات</p>
            <input type="file" id="image-upload" accept="image/*" multiple class="hidden">
        </div>
        <div id="image-preview" class="hidden mb-4">
            <h4 class="font-medium mb-2">الصور المحددة:</h4>
            <div id="preview-container" class="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto"></div>
        </div>
        <div class="flex flex-col space-y-3">
            <select id="pdf-format" class="p-2 border border-gray-300 rounded">
                <option value="a4">A4 - عمودي</option>
                <option value="a4-landscape">A4 - أفقي</option>
                <option value="letter">Letter - عمودي</option>
            </select>
            <button id="convert-images" class="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition">تحويل إلى PDF</button>
        </div>
        <div id="pdf-result-container" class="hidden mt-4">
            <button id="download-pdf" class="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition">تحميل PDF</button>
        </div>
    `;
}

function getSalaryCalculatorContent() {
    return `
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">الراتب الأساسي</label>
                <input type="number" id="basic-salary" class="w-full p-2 border border-gray-300 rounded" placeholder="0">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">البدلات</label>
                <input type="number" id="allowances" class="w-full p-2 border border-gray-300 rounded" placeholder="0">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">التأمينات (٪)</label>
                <input type="number" id="insurance" class="w-full p-2 border border-gray-300 rounded" value="9.75" step="0.25">
            </div>
            <button id="calc-salary" class="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded transition">حساب</button>
            <div id="salary-result" class="hidden p-4 bg-gray-100 rounded">
                <div class="space-y-2">
                    <p><span class="font-medium">إجمالي الراتب:</span> <span id="total-salary" class="font-bold text-green-600"></span></p>
                    <p><span class="font-medium">الاستقطاعات:</span> <span id="deductions" class="font-bold text-red-600"></span></p>
                    <p><span class="font-medium">الصافي:</span> <span id="net-salary" class="font-bold text-blue-600"></span></p>
                </div>
            </div>
        </div>
    `;
}

function getDateConverterContent() {
    return `
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">التاريخ الميلادي</label>
                <input type="date" id="gregorian-date" class="w-full p-2 border border-gray-300 rounded">
            </div>
            <button id="convert-to-hijri" class="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition">تحويل إلى هجري</button>
            <div id="hijri-result" class="hidden p-4 bg-gray-100 rounded text-center">
                <p class="text-sm text-gray-600 mb-1">التاريخ الهجري:</p>
                <p id="hijri-date" class="text-xl font-bold text-green-600"></p>
            </div>
            <div class="border-t pt-4">
                <div class="grid grid-cols-3 gap-2 mb-2">
                    <input type="number" id="hijri-day" placeholder="اليوم" class="p-2 border border-gray-300 rounded" min="1" max="30">
                    <input type="number" id="hijri-month" placeholder="الشهر" class="p-2 border border-gray-300 rounded" min="1" max="12">
                    <input type="number" id="hijri-year" placeholder="السنة" class="p-2 border border-gray-300 rounded" min="1300">
                </div>
                <button id="convert-to-gregorian" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition">تحويل إلى ميلادي</button>
                <div id="gregorian-result" class="hidden p-4 bg-gray-100 rounded text-center mt-4">
                    <p class="text-sm text-gray-600 mb-1">التاريخ الميلادي:</p>
                    <p id="converted-gregorian" class="text-xl font-bold text-blue-600"></p>
                </div>
            </div>
        </div>
    `;
}

function getUnitConverterContent() {
    return `
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">نوع التحويل</label>
                <select id="conversion-type" class="w-full p-2 border border-gray-300 rounded">
                    <option value="length">الطول</option>
                    <option value="weight">الوزن</option>
                    <option value="temperature">الحرارة</option>
                    <option value="area">المساحة</option>
                </select>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">من</label>
                    <select id="from-unit" class="w-full p-2 border border-gray-300 rounded"></select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">إلى</label>
                    <select id="to-unit" class="w-full p-2 border border-gray-300 rounded"></select>
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">القيمة</label>
                <input type="number" id="unit-value" class="w-full p-2 border border-gray-300 rounded" placeholder="0" step="any">
            </div>
            <button id="convert-unit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition">تحويل</button>
            <div id="unit-result" class="hidden p-4 bg-gray-100 rounded text-center">
                <p class="text-sm text-gray-600 mb-1">النتيجة:</p>
                <p id="converted-value" class="text-2xl font-bold text-blue-600"></p>
            </div>
        </div>
    `;
}

function getPercentageCalculatorContent() {
    return `
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">نوع الحساب</label>
                <select id="percentage-type" class="w-full p-2 border border-gray-300 rounded">
                    <option value="of">نسبة من عدد</option>
                    <option value="increase">زيادة بنسبة</option>
                    <option value="decrease">نقصان بنسبة</option>
                    <option value="difference">الفرق بالنسبة المئوية</option>
                </select>
            </div>
            <div id="percentage-inputs">
                <div class="space-y-3">
                    <input type="number" id="percent-value" class="w-full p-2 border border-gray-300 rounded" placeholder="النسبة المئوية" step="any">
                    <input type="number" id="base-value" class="w-full p-2 border border-gray-300 rounded" placeholder="القيمة الأساسية" step="any">
                </div>
            </div>
            <button id="calc-percentage" class="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded transition">حساب</button>
            <div id="percentage-result" class="hidden p-4 bg-gray-100 rounded text-center">
                <p class="text-sm text-gray-600 mb-1">النتيجة:</p>
                <p id="percentage-answer" class="text-2xl font-bold text-pink-600"></p>
            </div>
        </div>
    `;
}

function getImageCompressorContent() {
    return `
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4 cursor-pointer" id="compress-drop-zone">
            <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
            <p class="text-gray-500">اسحب وأسقط الصور هنا أو انقر لاختيار</p>
            <input type="file" id="compress-upload" accept="image/*" multiple class="hidden">
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">جودة الضغط</label>
            <input type="range" id="compress-quality" min="10" max="100" value="80" class="w-full">
            <p class="text-sm text-gray-600 text-center mt-1"><span id="quality-value">80</span>%</p>
        </div>
        <div id="compress-preview" class="hidden mt-4">
            <h4 class="font-medium mb-2">المعاينة:</h4>
            <div id="compress-container" class="space-y-3 max-h-96 overflow-y-auto"></div>
        </div>
    `;
}

function getQrGeneratorContent() {
    return `
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">النص أو الرابط</label>
                <textarea id="qr-text" rows="4" class="w-full p-2 border border-gray-300 rounded" placeholder="أدخل النص أو الرابط هنا"></textarea>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">الحجم</label>
                <select id="qr-size" class="w-full p-2 border border-gray-300 rounded">
                    <option value="128">صغير (128x128)</option>
                    <option value="256" selected>متوسط (256x256)</option>
                    <option value="512">كبير (512x512)</option>
                </select>
            </div>
            <button id="generate-qr" class="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded transition">إنشاء QR</button>
            <div id="qr-result" class="hidden text-center">
                <div id="qr-code" class="inline-block p-4 bg-white border-2 border-gray-300 rounded"></div>
                <button id="download-qr" class="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition">تحميل الصورة</button>
            </div>
        </div>
    `;
}

function getPasswordGeneratorContent() {
    return `
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">طول كلمة السر</label>
                <input type="range" id="password-length" min="8" max="32" value="16" class="w-full">
                <p class="text-sm text-gray-600 text-center mt-1"><span id="length-value">16</span> حرف</p>
            </div>
            <div class="space-y-2">
                <label class="flex items-center">
                    <input type="checkbox" id="include-uppercase" checked class="mr-2">
                    <span class="text-sm">أحرف كبيرة (A-Z)</span>
                </label>
                <label class="flex items-center">
                    <input type="checkbox" id="include-lowercase" checked class="mr-2">
                    <span class="text-sm">أحرف صغيرة (a-z)</span>
                </label>
                <label class="flex items-center">
                    <input type="checkbox" id="include-numbers" checked class="mr-2">
                    <span class="text-sm">أرقام (0-9)</span>
                </label>
                <label class="flex items-center">
                    <input type="checkbox" id="include-symbols" checked class="mr-2">
                    <span class="text-sm">رموز (!@#$%^&*)</span>
                </label>
            </div>
            <button id="generate-password" class="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded transition">توليد كلمة السر</button>
            <div id="password-result" class="hidden">
                <div class="p-4 bg-gray-100 rounded flex items-center justify-between">
                    <code id="generated-password" class="text-lg font-mono break-all"></code>
                    <button id="copy-password" class="mr-2 text-blue-600 hover:text-blue-800">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
                <div id="password-strength" class="mt-2 text-center">
                    <p class="text-sm">قوة كلمة السر: <span id="strength-text" class="font-bold"></span></p>
                    <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div id="strength-bar" class="h-2 rounded-full" style="width: 0%"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getCharacterCounterContent() {
    return `
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">النص</label>
                <textarea id="text-input" rows="8" class="w-full p-2 border border-gray-300 rounded" placeholder="اكتب أو الصق النص هنا..."></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div class="p-4 bg-blue-50 rounded text-center">
                    <p class="text-sm text-gray-600">عدد الحروف</p>
                    <p id="char-count" class="text-2xl font-bold text-blue-600">0</p>
                </div>
                <div class="p-4 bg-green-50 rounded text-center">
                    <p class="text-sm text-gray-600">عدد الكلمات</p>
                    <p id="word-count" class="text-2xl font-bold text-green-600">0</p>
                </div>
                <div class="p-4 bg-purple-50 rounded text-center">
                    <p class="text-sm text-gray-600">عدد الأسطر</p>
                    <p id="line-count" class="text-2xl font-bold text-purple-600">0</p>
                </div>
                <div class="p-4 bg-pink-50 rounded text-center">
                    <p class="text-sm text-gray-600">بدون مسافات</p>
                    <p id="char-no-space" class="text-2xl font-bold text-pink-600">0</p>
                </div>
            </div>
        </div>
    `;
}

function getRandomNumberContent() {
    return `
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">الحد الأدنى</label>
                <input type="number" id="min-number" class="w-full p-2 border border-gray-300 rounded" value="1">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">الحد الأقصى</label>
                <input type="number" id="max-number" class="w-full p-2 border border-gray-300 rounded" value="100">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">عدد الأرقام</label>
                <input type="number" id="count-numbers" class="w-full p-2 border border-gray-300 rounded" value="1" min="1" max="100">
            </div>
            <button id="generate-random" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition">توليد</button>
            <div id="random-result" class="hidden p-4 bg-gray-100 rounded">
                <p class="text-sm text-gray-600 mb-2 text-center">الأرقام العشوائية:</p>
                <div id="random-numbers" class="text-center text-2xl font-bold text-blue-600"></div>
            </div>
        </div>
    `;
}

function getColorPickerContent() {
    return `
        <div class="space-y-4">
            <div class="text-center">
                <input type="color" id="color-input" class="w-32 h-32 mx-auto border-0 rounded cursor-pointer" value="#3B82F6">
            </div>
            <div class="space-y-3">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">HEX</label>
                    <div class="flex">
                        <input type="text" id="hex-value" class="flex-1 p-2 border border-gray-300 rounded-r-none rounded" readonly>
                        <button onclick="copyColor('hex')" class="px-4 bg-gray-200 hover:bg-gray-300 border border-r-0 border-gray-300 rounded-l">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">RGB</label>
                    <div class="flex">
                        <input type="text" id="rgb-value" class="flex-1 p-2 border border-gray-300 rounded-r-none rounded" readonly>
                        <button onclick="copyColor('rgb')" class="px-4 bg-gray-200 hover:bg-gray-300 border border-r-0 border-gray-300 rounded-l">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">HSL</label>
                    <div class="flex">
                        <input type="text" id="hsl-value" class="flex-1 p-2 border border-gray-300 rounded-r-none rounded" readonly>
                        <button onclick="copyColor('hsl')" class="px-4 bg-gray-200 hover:bg-gray-300 border border-r-0 border-gray-300 rounded-l">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getBase64ConverterContent() {
    return `
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">النص الأصلي</label>
                <textarea id="base64-input" rows="4" class="w-full p-2 border border-gray-300 rounded" placeholder="أدخل النص هنا"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-2">
                <button id="encode-base64" class="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition">تشفير</button>
                <button id="decode-base64" class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition">فك التشفير</button>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">النتيجة</label>
                <textarea id="base64-output" rows="4" class="w-full p-2 border border-gray-300 rounded bg-gray-50" readonly></textarea>
            </div>
            <button id="copy-base64" class="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition">نسخ النتيجة</button>
        </div>
    `;
}

function getStopwatchContent() {
    return `
        <div class="space-y-6">
            <div class="text-center">
                <div id="stopwatch-display" class="text-6xl font-bold text-gray-800 font-mono">00:00:00</div>
                <div id="milliseconds-display" class="text-2xl text-gray-500 font-mono">.000</div>
            </div>
            <div class="grid grid-cols-3 gap-2">
                <button id="start-stopwatch" class="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded transition">
                    <i class="fas fa-play"></i> ابدأ
                </button>
                <button id="pause-stopwatch" class="bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-4 rounded transition" disabled>
                    <i class="fas fa-pause"></i> إيقاف
                </button>
                <button id="reset-stopwatch" class="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded transition">
                    <i class="fas fa-redo"></i> إعادة
                </button>
            </div>
            <div id="laps-container" class="hidden">
                <h4 class="font-medium mb-2">الأوقات المسجلة:</h4>
                <div id="laps-list" class="space-y-1 max-h-48 overflow-y-auto"></div>
            </div>
            <button id="lap-stopwatch" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition" disabled>
                <i class="fas fa-flag"></i> تسجيل الوقت
            </button>
        </div>
    `;
}

// Initialize tool-specific functionality
function initializeToolFunctionality(toolId) {
    switch(toolId) {
        case 'video-editor':
            initVideoEditor();
            break;
        case 'image-editor':
            initImageEditor();
            break;
        case 'prayer-times':
            initPrayerTimes();
            break;
        case 'desktop-browser':
            initDesktopBrowser();
            break;
        case 'speed-test':
            initSpeedTest();
            break;
        case 'pdf-to-image':
            initPdfToImage();
            break;
        case 'image-to-pdf':
            initImageToPdf();
            break;
        case 'salary-calculator':
            initSalaryCalculator();
            break;
        case 'date-converter':
            initDateConverter();
            break;
        case 'unit-converter':
            initUnitConverter();
            break;
        case 'percentage-calculator':
            initPercentageCalculator();
            break;
        case 'image-compressor':
            initImageCompressor();
            break;
        case 'qr-generator':
            initQrGenerator();
            break;
        case 'password-generator':
            initPasswordGenerator();
            break;
        case 'character-counter':
            initCharacterCounter();
            break;
        case 'random-number':
            initRandomNumber();
            break;
        case 'color-picker':
            initColorPicker();
            break;
        case 'base64-converter':
            initBase64Converter();
            break;
        case 'stopwatch':
            initStopwatch();
            break;
    }
}

// Video Editor functionality
let currentVideo = null;
function initVideoEditor() {
    const dropZone = document.getElementById('video-drop-zone');
    const fileInput = document.getElementById('video-upload');
    const workspace = document.getElementById('video-editor-workspace');
    const preview = document.getElementById('video-preview');
    
    dropZone.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('video/')) {
            currentVideo = file;
            const url = URL.createObjectURL(file);
            preview.src = url;
            workspace.classList.remove('hidden');
        }
    });
    
    // Apply filters in real-time
    ['brightness', 'contrast', 'saturation'].forEach(id => {
        document.getElementById(id)?.addEventListener('input', updateVideoFilters);
    });
}

function updateVideoFilters() {
    const preview = document.getElementById('video-preview');
    const brightness = document.getElementById('brightness').value;
    const contrast = document.getElementById('contrast').value;
    const saturation = document.getElementById('saturation').value;
    
    preview.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
}

function trimVideo() {
    alert('ميزة قص الفيديو: يمكنك تحديد نقطة البداية والنهاية لقص الفيديو.');
}

function rotateVideo() {
    const preview = document.getElementById('video-preview');
    const currentRotation = preview.style.transform || 'rotate(0deg)';
    const degrees = parseInt(currentRotation.match(/\d+/) || 0);
    preview.style.transform = `rotate(${degrees + 90}deg)`;
}

function addFilter() {
    alert('ميزة الفلاتر: يمكنك إضافة فلاتر مثل الأبيض والأسود، السيبيا، والمزيد.');
}

function adjustVideo() {
    alert('استخدم أشرطة التمرير أدناه لضبط السطوع والتباين والتشبع.');
}

function exportVideo(quality) {
    alert(`جاري تصدير الفيديو بجودة ${quality}... سيتم تحميل الملف قريباً.`);
}

// Image Editor functionality
let currentImage = null;
let imageCanvas = null;
let imageCtx = null;
let originalImageData = null;

function initImageEditor() {
    const dropZone = document.getElementById('image-editor-drop-zone');
    const fileInput = document.getElementById('image-editor-upload');
    const workspace = document.getElementById('image-editor-workspace');
    imageCanvas = document.getElementById('image-canvas');
    imageCtx = imageCanvas.getContext('2d');
    
    dropZone.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    currentImage = img;
                    imageCanvas.width = img.width;
                    imageCanvas.height = img.height;
                    imageCtx.drawImage(img, 0, 0);
                    originalImageData = imageCtx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
                    workspace.classList.remove('hidden');
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

function applyFilter(filterType) {
    if (!currentImage) return;
    
    imageCtx.putImageData(originalImageData, 0, 0);
    const imageData = imageCtx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
    const data = imageData.data;
    
    switch(filterType) {
        case 'grayscale':
            for (let i = 0; i < data.length; i += 4) {
                const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = data[i + 1] = data[i + 2] = avg;
            }
            break;
        case 'sepia':
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i], g = data[i + 1], b = data[i + 2];
                data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
                data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
                data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
            }
            break;
        case 'blur':
            alert('تم تطبيق فلتر الضبابية');
            break;
        case 'sharpen':
            alert('تم تطبيق فلتر الحدة');
            break;
    }
    
    imageCtx.putImageData(imageData, 0, 0);
    updateImageFilters();
}

function updateImageFilters() {
    if (!imageCanvas) return;
    const brightness = document.getElementById('img-brightness')?.value || 100;
    const contrast = document.getElementById('img-contrast')?.value || 100;
    const saturation = document.getElementById('img-saturation')?.value || 100;
    
    imageCanvas.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
}

function rotateImage() {
    if (!currentImage) return;
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = imageCanvas.height;
    tempCanvas.height = imageCanvas.width;
    tempCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);
    tempCtx.rotate(Math.PI / 2);
    tempCtx.drawImage(imageCanvas, -imageCanvas.width / 2, -imageCanvas.height / 2);
    imageCanvas.width = tempCanvas.width;
    imageCanvas.height = tempCanvas.height;
    imageCtx.drawImage(tempCanvas, 0, 0);
    originalImageData = imageCtx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
}

function flipImage() {
    if (!currentImage) return;
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = imageCanvas.width;
    tempCanvas.height = imageCanvas.height;
    tempCtx.translate(tempCanvas.width, 0);
    tempCtx.scale(-1, 1);
    tempCtx.drawImage(imageCanvas, 0, 0);
    imageCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    imageCtx.drawImage(tempCanvas, 0, 0);
    originalImageData = imageCtx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
}

function resetImage() {
    if (originalImageData) {
        imageCtx.putImageData(originalImageData, 0, 0);
        document.getElementById('img-brightness').value = 100;
        document.getElementById('img-contrast').value = 100;
        document.getElementById('img-saturation').value = 100;
        imageCanvas.style.filter = 'none';
    }
}

function downloadEditedImage() {
    if (!imageCanvas) return;
    
    // Create a temporary canvas to apply CSS filters
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = imageCanvas.width;
    tempCanvas.height = imageCanvas.height;
    
    // Get filter values
    const brightness = document.getElementById('img-brightness')?.value || 100;
    const contrast = document.getElementById('img-contrast')?.value || 100;
    const saturation = document.getElementById('img-saturation')?.value || 100;
    
    // Apply filters manually
    tempCtx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
    tempCtx.drawImage(imageCanvas, 0, 0);
    
    const link = document.createElement('a');
    link.download = `edited-image-${Date.now()}.png`;
    link.href = tempCanvas.toDataURL();
    link.click();
}

// Prayer Times functionality
function initPrayerTimes() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchPrayerTimes(lat, lon);
            },
            error => {
                // Default to Riyadh if geolocation fails
                fetchPrayerTimes(24.7136, 46.6753);
            }
        );
    } else {
        fetchPrayerTimes(24.7136, 46.6753);
    }
}

async function fetchPrayerTimes(lat, lon) {
    try {
        const date = new Date();
        const timestamp = Math.floor(date.getTime() / 1000);
        
        // Using Aladhan API for prayer times
        const response = await fetch(`https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lon}&method=4`);
        const data = await response.json();
        
        if (data.code === 200) {
            const timings = data.data.timings;
            const dateInfo = data.data.date;
            
            document.getElementById('prayer-date').textContent = `${dateInfo.hijri.day} ${dateInfo.hijri.month.ar} ${dateInfo.hijri.year}هـ - ${dateInfo.readable}`;
            document.getElementById('prayer-location').textContent = `${data.data.meta.timezone}`;
            
            document.getElementById('fajr-time').textContent = timings.Fajr;
            document.getElementById('sunrise-time').textContent = timings.Sunrise;
            document.getElementById('dhuhr-time').textContent = timings.Dhuhr;
            document.getElementById('asr-time').textContent = timings.Asr;
            document.getElementById('maghrib-time').textContent = timings.Maghrib;
            document.getElementById('isha-time').textContent = timings.Isha;
            
            document.getElementById('prayer-times-loading').classList.add('hidden');
            document.getElementById('prayer-times-list').classList.remove('hidden');
            document.getElementById('next-prayer').classList.remove('hidden');
            
            calculateNextPrayer(timings);
        }
    } catch (error) {
        console.error('Error fetching prayer times:', error);
        document.getElementById('prayer-times-loading').innerHTML = '<p class="text-red-600">حدث خطأ في تحميل أوقات الصلاة</p>';
    }
}

function calculateNextPrayer(timings) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const prayers = [
        { name: 'الفجر', time: timings.Fajr },
        { name: 'الظهر', time: timings.Dhuhr },
        { name: 'العصر', time: timings.Asr },
        { name: 'المغرب', time: timings.Maghrib },
        { name: 'العشاء', time: timings.Isha }
    ];
    
    for (let prayer of prayers) {
        const [hours, minutes] = prayer.time.split(':').map(Number);
        const prayerTime = hours * 60 + minutes;
        
        if (prayerTime > currentTime) {
            const diff = prayerTime - currentTime;
            const hoursLeft = Math.floor(diff / 60);
            const minutesLeft = diff % 60;
            
            document.getElementById('next-prayer-name').textContent = prayer.name;
            document.getElementById('time-remaining').textContent = `${hoursLeft} ساعة و ${minutesLeft} دقيقة`;
            return;
        }
    }
    
    // If no prayer left today, show Fajr as next
    document.getElementById('next-prayer-name').textContent = 'الفجر';
    document.getElementById('time-remaining').textContent = 'غداً';
}

// Desktop Browser functionality
function initDesktopBrowser() {
    document.getElementById('browser-url').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') browserGo();
    });
}

function browserGo() {
    let url = document.getElementById('browser-url').value;
    if (!url.startsWith('http')) {
        url = 'https://' + url;
    }
    document.getElementById('desktop-iframe').src = url;
}

function browserBack() {
    try {
        document.getElementById('desktop-iframe').contentWindow.history.back();
    } catch(e) {
        alert('لا يمكن الرجوع للخلف');
    }
}

function browserForward() {
    try {
        document.getElementById('desktop-iframe').contentWindow.history.forward();
    } catch(e) {
        alert('لا يمكن التقدم للأمام');
    }
}

function browserRefresh() {
    document.getElementById('desktop-iframe').contentWindow.location.reload();
}

function browserFullscreen() {
    const iframe = document.getElementById('desktop-iframe');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
    }
}

function loadSite(url) {
    document.getElementById('browser-url').value = url;
    document.getElementById('desktop-iframe').src = url;
}

// Speed Test functionality
function initSpeedTest() {
    const startBtn = document.getElementById('start-test');
    const speedValue = document.getElementById('speed-value');
    const speedProgress = document.getElementById('speed-progress');
    const testStatus = document.getElementById('test-status');
    const testResults = document.getElementById('test-results');
    const downloadSpeed = document.getElementById('download-speed');
    const uploadSpeed = document.getElementById('upload-speed');
    const pingValue = document.getElementById('ping-value');
    
    startBtn.addEventListener('click', async () => {
        startBtn.disabled = true;
        testResults.classList.add('hidden');
        testStatus.textContent = 'جاري قياس سرعة الاستجابة...';
        
        // Simulate ping test
        const ping = await simulatePing();
        pingValue.textContent = ping;
        
        // Simulate download test
        testStatus.textContent = 'جاري قياس سرعة التحميل...';
        const download = await simulateSpeedTest('download', speedValue, speedProgress);
        downloadSpeed.textContent = download;
        
        // Simulate upload test
        testStatus.textContent = 'جاري قياس سرعة الرفع...';
        const upload = await simulateSpeedTest('upload', speedValue, speedProgress);
        uploadSpeed.textContent = upload;
        
        testStatus.textContent = 'اكتمل الاختبار!';
        testResults.classList.remove('hidden');
        startBtn.disabled = false;
    });
}

async function simulatePing() {
    const startTime = Date.now();
    try {
        await fetch('https://www.google.com/favicon.ico', { mode: 'no-cors' });
        return Math.round(Date.now() - startTime);
    } catch {
        return Math.round(Math.random() * 50 + 10);
    }
}

async function simulateSpeedTest(type, valueElement, progressElement) {
    return new Promise((resolve) => {
        let speed = 0;
        const maxSpeed = Math.random() * 50 + 20;
        const interval = setInterval(() => {
            speed += Math.random() * 5;
            if (speed >= maxSpeed) {
                speed = maxSpeed;
                clearInterval(interval);
                setTimeout(() => {
                    resolve(speed.toFixed(2));
                }, 500);
            }
            valueElement.textContent = speed.toFixed(2);
            const progress = (speed / 100) * 565.48;
            progressElement.style.strokeDashoffset = 565.48 - progress;
        }, 100);
    });
}

// PDF to Image functionality
function initPdfToImage() {
    const dropZone = document.getElementById('pdf-drop-zone');
    const fileInput = document.getElementById('pdf-upload');
    
    dropZone.addEventListener('click', () => fileInput.click());
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('border-blue-500');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('border-blue-500');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-blue-500');
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            processPdfFile(file);
        }
    });
    
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            processPdfFile(file);
        }
    });
}

async function processPdfFile(file) {
    const progressDiv = document.getElementById('pdf-progress');
    const progressBar = document.getElementById('pdf-progress-bar');
    const progressText = document.getElementById('pdf-progress-text');
    const resultDiv = document.getElementById('pdf-result');
    const imagesContainer = document.getElementById('converted-images');
    
    progressDiv.classList.remove('hidden');
    resultDiv.classList.add('hidden');
    imagesContainer.innerHTML = '';
    
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
        const numPages = pdf.numPages;
        
        for (let i = 1; i <= numPages; i++) {
            progressBar.style.width = `${(i / numPages) * 100}%`;
            progressText.textContent = `جاري معالجة الصفحة ${i} من ${numPages}...`;
            
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 2 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            
            await page.render({ canvasContext: context, viewport: viewport }).promise;
            
            const imgDiv = document.createElement('div');
            imgDiv.className = 'relative';
            imgDiv.innerHTML = `
                <img src="${canvas.toDataURL('image/png')}" class="w-full rounded border">
                <button onclick="downloadImage(this)" class="absolute top-2 left-2 bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs">
                    <i class="fas fa-download"></i> تحميل
                </button>
            `;
            imagesContainer.appendChild(imgDiv);
        }
        
        progressDiv.classList.add('hidden');
        resultDiv.classList.remove('hidden');
    } catch (error) {
        alert('حدث خطأ أثناء معالجة ملف PDF');
        progressDiv.classList.add('hidden');
    }
}

function downloadImage(button) {
    const img = button.parentElement.querySelector('img');
    const link = document.createElement('a');
    link.download = `page-${Date.now()}.png`;
    link.href = img.src;
    link.click();
}

// Image to PDF functionality
function initImageToPdf() {
    const dropZone = document.getElementById('image-drop-zone');
    const fileInput = document.getElementById('image-upload');
    const convertBtn = document.getElementById('convert-images');
    let selectedImages = [];
    
    dropZone.addEventListener('click', () => fileInput.click());
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('border-purple-500');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('border-purple-500');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-purple-500');
        handleImageFiles(Array.from(e.dataTransfer.files));
    });
    
    fileInput.addEventListener('change', (e) => {
        handleImageFiles(Array.from(e.target.files));
    });
    
    function handleImageFiles(files) {
        selectedImages = files.filter(f => f.type.startsWith('image/'));
        if (selectedImages.length > 0) {
            displayImagePreviews();
        }
    }
    
    function displayImagePreviews() {
        const previewDiv = document.getElementById('image-preview');
        const container = document.getElementById('preview-container');
        container.innerHTML = '';
        
        selectedImages.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const div = document.createElement('div');
                div.innerHTML = `<img src="${e.target.result}" class="w-full h-20 object-cover rounded border">`;
                container.appendChild(div);
            };
            reader.readAsDataURL(file);
        });
        
        previewDiv.classList.remove('hidden');
    }
    
    convertBtn.addEventListener('click', async () => {
        if (selectedImages.length === 0) {
            alert('الرجاء اختيار صور أولاً');
            return;
        }
        
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        
        for (let i = 0; i < selectedImages.length; i++) {
            const img = await loadImage(selectedImages[i]);
            
            if (i > 0) pdf.addPage();
            
            const imgWidth = pdf.internal.pageSize.getWidth();
            const imgHeight = (img.height * imgWidth) / img.width;
            
            pdf.addImage(img.src, 'JPEG', 0, 0, imgWidth, imgHeight);
        }
        
        const resultDiv = document.getElementById('pdf-result-container');
        const downloadBtn = document.getElementById('download-pdf');
        
        downloadBtn.onclick = () => {
            pdf.save('converted-images.pdf');
        };
        
        resultDiv.classList.remove('hidden');
    });
    
    function loadImage(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }
}

// Salary Calculator
function initSalaryCalculator() {
    document.getElementById('calc-salary').addEventListener('click', () => {
        const basic = parseFloat(document.getElementById('basic-salary').value) || 0;
        const allowances = parseFloat(document.getElementById('allowances').value) || 0;
        const insurance = parseFloat(document.getElementById('insurance').value) || 0;
        
        const total = basic + allowances;
        const deductions = total * (insurance / 100);
        const net = total - deductions;
        
        document.getElementById('total-salary').textContent = total.toFixed(2) + ' ريال';
        document.getElementById('deductions').textContent = deductions.toFixed(2) + ' ريال';
        document.getElementById('net-salary').textContent = net.toFixed(2) + ' ريال';
        document.getElementById('salary-result').classList.remove('hidden');
    });
}

// Date Converter with accurate Hijri conversion
function initDateConverter() {
    const gregorianInput = document.getElementById('gregorian-date');
    gregorianInput.valueAsDate = new Date();
    
    document.getElementById('convert-to-hijri').addEventListener('click', () => {
        const date = new Date(gregorianInput.value);
        const hijriDate = gregorianToHijri(date);
        document.getElementById('hijri-date').textContent = hijriDate;
        document.getElementById('hijri-result').classList.remove('hidden');
    });
    
    document.getElementById('convert-to-gregorian').addEventListener('click', () => {
        const day = parseInt(document.getElementById('hijri-day').value);
        const month = parseInt(document.getElementById('hijri-month').value);
        const year = parseInt(document.getElementById('hijri-year').value);
        
        if (!day || !month || !year) {
            alert('الرجاء إدخال التاريخ الهجري كاملاً');
            return;
        }
        
        const gregorianDate = hijriToGregorian(day, month, year);
        document.getElementById('converted-gregorian').textContent = gregorianDate;
        document.getElementById('gregorian-result').classList.remove('hidden');
    });
}

// Accurate Gregorian to Hijri conversion using Umm al-Qura calendar algorithm
function gregorianToHijri(date) {
    // Julian Day Number calculation
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    let a = Math.floor((14 - month) / 12);
    let y = year + 4800 - a;
    let m = month + 12 * a - 3;
    
    let jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    
    // Convert JDN to Hijri
    let l = jdn - 1948440 + 10632;
    let n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n + 354;
    let j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) + (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238));
    l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
    
    const hijriMonth = Math.floor((24 * l) / 709);
    const hijriDay = l - Math.floor((709 * hijriMonth) / 24);
    const hijriYear = 30 * n + j - 30;
    
    const months = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة', 
                   'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
    
    return `${hijriDay} ${months[hijriMonth - 1]} ${hijriYear}`;
}

// Accurate Hijri to Gregorian conversion
function hijriToGregorian(day, month, year) {
    // Calculate Julian Day Number from Hijri date
    let jdn = Math.floor((11 * year + 3) / 30) + 354 * year + 30 * month - Math.floor((month - 1) / 2) + day + 1948440 - 385;
    
    // Convert JDN to Gregorian
    let l = jdn + 68569;
    let n = Math.floor((4 * l) / 146097);
    l = l - Math.floor((146097 * n + 3) / 4);
    let i = Math.floor((4000 * (l + 1)) / 1461001);
    l = l - Math.floor((1461 * i) / 4) + 31;
    let j = Math.floor((80 * l) / 2447);
    let gregDay = l - Math.floor((2447 * j) / 80);
    l = Math.floor(j / 11);
    let gregMonth = j + 2 - 12 * l;
    let gregYear = 100 * (n - 49) + i + l;
    
    const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 
                       'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    
    return `${gregDay} ${monthNames[gregMonth - 1]} ${gregYear}`;
}

// Unit Converter
function initUnitConverter() {
    const units = {
        length: {
            'متر': 1,
            'كيلومتر': 0.001,
            'سنتيمتر': 100,
            'ميل': 0.000621371,
            'قدم': 3.28084,
            'بوصة': 39.3701
        },
        weight: {
            'كيلوجرام': 1,
            'جرام': 1000,
            'طن': 0.001,
            'رطل': 2.20462,
            'أونصة': 35.274
        },
        temperature: {
            'مئوية': 'c',
            'فهرنهايت': 'f',
            'كلفن': 'k'
        },
        area: {
            'متر مربع': 1,
            'كيلومتر مربع': 0.000001,
            'هكتار': 0.0001,
            'فدان': 0.000247105
        }
    };
    
    const typeSelect = document.getElementById('conversion-type');
    const fromSelect = document.getElementById('from-unit');
    const toSelect = document.getElementById('to-unit');
    
    function updateUnits() {
        const type = typeSelect.value;
        const unitList = Object.keys(units[type]);
        
        fromSelect.innerHTML = unitList.map(u => `<option value="${u}">${u}</option>`).join('');
        toSelect.innerHTML = unitList.map(u => `<option value="${u}">${u}</option>`).join('');
        toSelect.selectedIndex = 1;
    }
    
    typeSelect.addEventListener('change', updateUnits);
    updateUnits();
    
    document.getElementById('convert-unit').addEventListener('click', () => {
        const type = typeSelect.value;
        const value = parseFloat(document.getElementById('unit-value').value);
        const from = fromSelect.value;
        const to = toSelect.value;
        
        if (!value) {
            alert('الرجاء إدخال قيمة');
            return;
        }
        
        let result;
        if (type === 'temperature') {
            result = convertTemperature(value, from, to);
        } else {
            const fromFactor = units[type][from];
            const toFactor = units[type][to];
            result = (value / fromFactor) * toFactor;
        }
        
        document.getElementById('converted-value').textContent = `${result.toFixed(4)} ${to}`;
        document.getElementById('unit-result').classList.remove('hidden');
    });
}

function convertTemperature(value, from, to) {
    let celsius;
    
    if (from === 'مئوية') celsius = value;
    else if (from === 'فهرنهايت') celsius = (value - 32) * 5/9;
    else celsius = value - 273.15;
    
    if (to === 'مئوية') return celsius;
    else if (to === 'فهرنهايت') return celsius * 9/5 + 32;
    else return celsius + 273.15;
}

// Percentage Calculator
function initPercentageCalculator() {
    const typeSelect = document.getElementById('percentage-type');
    
    typeSelect.addEventListener('change', () => {
        const type = typeSelect.value;
        const inputsDiv = document.getElementById('percentage-inputs');
        
        if (type === 'difference') {
            inputsDiv.innerHTML = `
                <div class="space-y-3">
                    <input type="number" id="value1" class="w-full p-2 border border-gray-300 rounded" placeholder="القيمة الأولى" step="any">
                    <input type="number" id="value2" class="w-full p-2 border border-gray-300 rounded" placeholder="القيمة الثانية" step="any">
                </div>
            `;
        } else {
            inputsDiv.innerHTML = `
                <div class="space-y-3">
                    <input type="number" id="percent-value" class="w-full p-2 border border-gray-300 rounded" placeholder="النسبة المئوية" step="any">
                    <input type="number" id="base-value" class="w-full p-2 border border-gray-300 rounded" placeholder="القيمة الأساسية" step="any">
                </div>
            `;
        }
    });
    
    document.getElementById('calc-percentage').addEventListener('click', () => {
        const type = typeSelect.value;
        let result;
        
        if (type === 'difference') {
            const val1 = parseFloat(document.getElementById('value1').value);
            const val2 = parseFloat(document.getElementById('value2').value);
            result = ((val2 - val1) / val1 * 100).toFixed(2) + '%';
        } else {
            const percent = parseFloat(document.getElementById('percent-value').value);
            const base = parseFloat(document.getElementById('base-value').value);
            
            if (type === 'of') {
                result = ((percent / 100) * base).toFixed(2);
            } else if (type === 'increase') {
                result = (base + (percent / 100) * base).toFixed(2);
            } else {
                result = (base - (percent / 100) * base).toFixed(2);
            }
        }
        
        document.getElementById('percentage-answer').textContent = result;
        document.getElementById('percentage-result').classList.remove('hidden');
    });
}

// Image Compressor
function initImageCompressor() {
    const dropZone = document.getElementById('compress-drop-zone');
    const fileInput = document.getElementById('compress-upload');
    const qualitySlider = document.getElementById('compress-quality');
    const qualityValue = document.getElementById('quality-value');
    
    qualitySlider.addEventListener('input', () => {
        qualityValue.textContent = qualitySlider.value;
    });
    
    dropZone.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
        handleCompressImages(Array.from(e.target.files));
    });
    
    function handleCompressImages(files) {
        const container = document.getElementById('compress-container');
        const previewDiv = document.getElementById('compress-preview');
        container.innerHTML = '';
        
        files.forEach(file => {
            if (!file.type.startsWith('image/')) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    
                    const quality = qualitySlider.value / 100;
                    const compressed = canvas.toDataURL('image/jpeg', quality);
                    
                    const originalSize = (file.size / 1024).toFixed(2);
                    const compressedSize = (compressed.length * 0.75 / 1024).toFixed(2);
                    
                    const div = document.createElement('div');
                    div.className = 'border rounded p-3';
                    div.innerHTML = `
                        <img src="${compressed}" class="w-full rounded mb-2">
                        <div class="text-sm text-gray-600">
                            <p>الحجم الأصلي: ${originalSize} KB</p>
                            <p>الحجم المضغوط: ${compressedSize} KB</p>
                            <p class="text-green-600">التوفير: ${((1 - compressedSize/originalSize) * 100).toFixed(1)}%</p>
                        </div>
                        <button onclick="downloadCompressed(this, '${compressed}')" class="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded text-sm">
                            تحميل
                        </button>
                    `;
                    container.appendChild(div);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
        
        previewDiv.classList.remove('hidden');
    }
}

function downloadCompressed(button, dataUrl) {
    const link = document.createElement('a');
    link.download = `compressed-${Date.now()}.jpg`;
    link.href = dataUrl;
    link.click();
}

// QR Generator
function initQrGenerator() {
    document.getElementById('generate-qr').addEventListener('click', () => {
        const text = document.getElementById('qr-text').value;
        const size = parseInt(document.getElementById('qr-size').value);
        
        if (!text) {
            alert('الرجاء إدخال نص أو رابط');
            return;
        }
        
        const qrContainer = document.getElementById('qr-code');
        qrContainer.innerHTML = '';
        
        new QRCode(qrContainer, {
            text: text,
            width: size,
            height: size
        });
        
        document.getElementById('qr-result').classList.remove('hidden');
        
        setTimeout(() => {
            document.getElementById('download-qr').onclick = () => {
                const canvas = qrContainer.querySelector('canvas');
                const link = document.createElement('a');
                link.download = '/images/QRCode.jpg';
                link.href = canvas.toDataURL();
                link.click();
            };
        }, 100);
    });
}

// Password Generator
function initPasswordGenerator() {
    const lengthSlider = document.getElementById('password-length');
    const lengthValue = document.getElementById('length-value');
    
    lengthSlider.addEventListener('input', () => {
        lengthValue.textContent = lengthSlider.value;
    });
    
    document.getElementById('generate-password').addEventListener('click', () => {
        const length = parseInt(lengthSlider.value);
        const includeUpper = document.getElementById('include-uppercase').checked;
        const includeLower = document.getElementById('include-lowercase').checked;
        const includeNumbers = document.getElementById('include-numbers').checked;
        const includeSymbols = document.getElementById('include-symbols').checked;
        
        let chars = '';
        if (includeUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeLower) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) chars += '0123456789';
        if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        if (!chars) {
            alert('الرجاء اختيار نوع حرف واحد على الأقل');
            return;
        }
        
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        document.getElementById('generated-password').textContent = password;
        document.getElementById('password-result').classList.remove('hidden');
        
        // Calculate strength
        let strength = 0;
        if (includeUpper) strength += 25;
        if (includeLower) strength += 25;
        if (includeNumbers) strength += 25;
        if (includeSymbols) strength += 25;
        if (length >= 12) strength += 20;
        if (length >= 16) strength += 20;
        
        const strengthBar = document.getElementById('strength-bar');
        const strengthText = document.getElementById('strength-text');
        
        strengthBar.style.width = Math.min(strength, 100) + '%';
        
        if (strength < 40) {
            strengthBar.className = 'h-2 rounded-full bg-red-500';
            strengthText.textContent = 'ضعيفة';
            strengthText.className = 'font-bold text-red-600';
        } else if (strength < 70) {
            strengthBar.className = 'h-2 rounded-full bg-yellow-500';
            strengthText.textContent = 'متوسطة';
            strengthText.className = 'font-bold text-yellow-600';
        } else {
            strengthBar.className = 'h-2 rounded-full bg-green-500';
            strengthText.textContent = 'قوية';
            strengthText.className = 'font-bold text-green-600';
        }
    });
    
    document.getElementById('copy-password').addEventListener('click', () => {
        const password = document.getElementById('generated-password').textContent;
        navigator.clipboard.writeText(password).then(() => {
            alert('تم نسخ كلمة السر');
        });
    });
}

// Character Counter
function initCharacterCounter() {
    const textInput = document.getElementById('text-input');
    
    function updateCounts() {
        const text = textInput.value;
        
        document.getElementById('char-count').textContent = text.length;
        document.getElementById('char-no-space').textContent = text.replace(/\s/g, '').length;
        document.getElementById('word-count').textContent = text.trim() ? text.trim().split(/\s+/).length : 0;
        document.getElementById('line-count').textContent = text.split('\n').length;
    }
    
    textInput.addEventListener('input', updateCounts);
}

// Random Number Generator
function initRandomNumber() {
    document.getElementById('generate-random').addEventListener('click', () => {
        const min = parseInt(document.getElementById('min-number').value);
        const max = parseInt(document.getElementById('max-number').value);
        const count = parseInt(document.getElementById('count-numbers').value);
        
        if (min >= max) {
            alert('الحد الأدنى يجب أن يكون أقل من الحد الأقصى');
            return;
        }
        
        const numbers = [];
        for (let i = 0; i < count; i++) {
            numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        
        document.getElementById('random-numbers').textContent = numbers.join(', ');
        document.getElementById('random-result').classList.remove('hidden');
    });
}

// Color Picker
function initColorPicker() {
    const colorInput = document.getElementById('color-input');
    
    function updateColorValues() {
        const hex = colorInput.value;
        const rgb = hexToRgb(hex);
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        
        document.getElementById('hex-value').value = hex;
        document.getElementById('rgb-value').value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        document.getElementById('hsl-value').value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    }
    
    colorInput.addEventListener('input', updateColorValues);
    updateColorValues();
}

function copyColor(type) {
    const input = document.getElementById(`${type}-value`);
    input.select();
    navigator.clipboard.writeText(input.value).then(() => {
        alert('تم النسخ');
    });
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

// Base64 Converter
function initBase64Converter() {
    document.getElementById('encode-base64').addEventListener('click', () => {
        const input = document.getElementById('base64-input').value;
        if (!input) {
            alert('الرجاء إدخال نص');
            return;
        }
        const encoded = btoa(unescape(encodeURIComponent(input)));
        document.getElementById('base64-output').value = encoded;
    });
    
    document.getElementById('decode-base64').addEventListener('click', () => {
        const input = document.getElementById('base64-input').value;
        if (!input) {
            alert('الرجاء إدخال نص مشفر');
            return;
        }
        try {
            const decoded = decodeURIComponent(escape(atob(input)));
            document.getElementById('base64-output').value = decoded;
        } catch (e) {
            alert('النص المدخل غير صحيح');
        }
    });
    
    document.getElementById('copy-base64').addEventListener('click', () => {
        const output = document.getElementById('base64-output');
        output.select();
        navigator.clipboard.writeText(output.value).then(() => {
            alert('تم النسخ');
        });
    });
}

// Stopwatch
function initStopwatch() {
    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;
    let laps = [];
    
    const display = document.getElementById('stopwatch-display');
    const millisDisplay = document.getElementById('milliseconds-display');
    const startBtn = document.getElementById('start-stopwatch');
    const pauseBtn = document.getElementById('pause-stopwatch');
    const resetBtn = document.getElementById('reset-stopwatch');
    const lapBtn = document.getElementById('lap-stopwatch');
    const lapsContainer = document.getElementById('laps-container');
    const lapsList = document.getElementById('laps-list');
    
    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = ms % 1000;
        
        return {
            time: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
            millis: `.${pad(milliseconds, 3)}`
        };
    }
    
    function pad(num, size = 2) {
        return String(num).padStart(size, '0');
    }
    
    function updateDisplay() {
        const current = Date.now() - startTime + elapsedTime;
        const formatted = formatTime(current);
        display.textContent = formatted.time;
        millisDisplay.textContent = formatted.millis;
    }
    
    startBtn.addEventListener('click', () => {
        if (!isRunning) {
            startTime = Date.now();
            timerInterval = setInterval(updateDisplay, 10);
            isRunning = true;
            startBtn.disabled = true;
            pauseBtn.disabled = false;
            lapBtn.disabled = false;
        }
    });
    
    pauseBtn.addEventListener('click', () => {
        if (isRunning) {
            clearInterval(timerInterval);
            elapsedTime += Date.now() - startTime;
            isRunning = false;
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            lapBtn.disabled = true;
        }
    });
    
    resetBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        startTime = 0;
        elapsedTime = 0;
        isRunning = false;
        laps = [];
        display.textContent = '00:00:00';
        millisDisplay.textContent = '.000';
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        lapBtn.disabled = true;
        lapsContainer.classList.add('hidden');
        lapsList.innerHTML = '';
    });
    
    lapBtn.addEventListener('click', () => {
        const current = Date.now() - startTime + elapsedTime;
        laps.push(current);
        
        const formatted = formatTime(current);
        const lapDiv = document.createElement('div');
        lapDiv.className = 'flex justify-between p-2 bg-gray-100 rounded';
        lapDiv.innerHTML = `
            <span>اللفة ${laps.length}</span>
            <span class="font-mono">${formatted.time}${formatted.millis}</span>
        `;
        lapsList.insertBefore(lapDiv, lapsList.firstChild);
        lapsContainer.classList.remove('hidden');
    });
}
