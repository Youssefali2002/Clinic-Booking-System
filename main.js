    // 1. المرجع الأساسي للمواعيد عشان نضمن الترتيب دايماً
const allTimes = [
    { value: "10:00", text: "10:00 صباحاً" },
    { value: "11:00", text: "11:00 صباحاً" },
    { value: "12:00", text: "12:00 ظهراً" },
    { value: "01:00", text: "01:00 ظهراً" },
    { value: "02:00", text: "02:00 ظهراً" }
];

const dateSelect = document.getElementById('dateSelect');
const singleSelect = document.getElementById('singleSelect');
const multiSelect = document.getElementById('multiSelect');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');

// 2. وظيفة حفظ البيانات
function saveBookingData() {
    const selectedDate = dateSelect.value;
    if (!selectedDate) {
        showMessage('يجب اختيار تاريخ', 'error');
        return;
    }
    
    const selectedValues = Array.from(multiSelect.selectedOptions).map(opt => opt.value);
    const bookingData = {
        date: selectedDate,
        selectedTimes: selectedValues,
        timestamp: new Date().toISOString()
    };
    
    // حفظ البيانات في localStorage
    localStorage.setItem(`booking_${selectedDate}`, JSON.stringify(bookingData));
    showMessage('تم حفظ البيانات بنجاح!', 'success');
}

function loadBookingData() {
    const selectedDate = dateSelect.value;
    if (!selectedDate) return;
    
    const savedData = localStorage.getItem(`booking_${selectedDate}`);
    if (savedData) {
        const bookingData = JSON.parse(savedData);
        
        // تحديث القائمة المتعددة
        multiSelect.querySelectorAll('option').forEach(option => {
            option.selected = bookingData.selectedTimes.includes(option.value);
        });
        
        syncSelections();
        showMessage(`تم تحميل البيانات لليوم ${selectedDate}`, 'info');
    } else {
        // إعادة ضبط القائمة المتعددة
        multiSelect.querySelectorAll('option').forEach(option => {
            option.selected = false;
        });
        syncSelections();
    }
}

function clearBookingData() {
    const selectedDate = dateSelect.value;
    if (!selectedDate) {
        showMessage('يجب اختيار تاريخ', 'error');
        return;
    }
    
    if (confirm(`هل أنت متأكد من حذف البيانات لليوم ${selectedDate}?`)) {
        localStorage.removeItem(`booking_${selectedDate}`);
        
        // إعادة ضبط القائمة المتعددة
        multiSelect.querySelectorAll('option').forEach(option => {
            option.selected = false;
        });
        syncSelections();
        
        showMessage('تم حذف البيانات بنجاح', 'success');
    }
}

// 3. وظيفة التزامن
function syncSelections() {
    // الحصول على القيم المختارة في القائمة المتعددة
    const selectedValues = Array.from(multiSelect.selectedOptions).map(opt => opt.value);

    // حذف جميع الخيارات من القائمة الأولى
    singleSelect.innerHTML = '';

    // تحديث القائمة الأولى
    allTimes.forEach(timeObj => {
        // إذا لم يتم اختيار الوقت
        if (!selectedValues.includes(timeObj.value)) {
            // إنشاء خيار جديد وإضافته إلى القائمة الأولى
            const option = document.createElement('option');
            option.value = timeObj.value;
            option.textContent = timeObj.text;
            singleSelect.appendChild(option);
        }
    });
}

// 4. وظيفة عرض الرسالة
function showMessage(message, type = 'info') {
    // إنشاء عنصر div جديد لعرض الرسالة
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // إضافة العنصر إلى الصفحة
    document.body.appendChild(messageDiv);
    
    // حذف الرسالة بعد 3 ثواني
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// 5. إضافة الأحداث
dateSelect.addEventListener('change', loadBookingData);
multiSelect.addEventListener('change', syncSelections);
saveBtn.addEventListener('click', saveBookingData);
clearBtn.addEventListener('click', clearBookingData);

// 6. تحميل البيانات عند بدء الصفحة
window.addEventListener('load', () => {
    const today = new Date().toISOString().split('T')[0];
    dateSelect.value = today;
    dateSelect.min = today; // تحديد تاريخ اليوم كتاريخ أدنى
    loadBookingData();
});
