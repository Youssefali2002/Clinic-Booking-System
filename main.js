    // 1. المرجع الأساسي للمواعيد عشان نضمن الترتيب دايماً
    const allTimes = [
        { value: "10:00", text: "10:00 صباحاً" },
        { value: "11:00", text: "11:00 صباحاً" },
        { value: "12:00", text: "12:00 ظهراً" },
        { value: "01:00", text: "01:00 ظهراً" },
        { value: "02:00", text: "02:00 ظهراً" }
    ];

    const singleSelect = document.getElementById('singleSelect');
    const multiSelect = document.getElementById('multiSelect');

    // 2. وظيفة التزامن
    function syncSelections() {
        // نجيب القيم اللي اليوزر اختارها (Selected) في القائمة المتعددة
        const selectedValues = Array.from(multiSelect.selectedOptions).map(opt => opt.value);

        // نمسح القائمة الأولى تماماً عشان نعيد بناءها بالترتيب
        singleSelect.innerHTML = '';

        // نلف على المصفوفة الأساسية
        allTimes.forEach(timeObj => {
            // لو الموعد ده "مش" موجود في الاختيارات اللي اخترناها تحت
            if (!selectedValues.includes(timeObj.value)) {
                // ننشئ عنصر Option جديد ونضيفه للقائمة الأولى
                const option = document.createElement('option');
                option.value = timeObj.value;
                option.textContent = timeObj.text;
                singleSelect.appendChild(option);
            }
        });
    }

    // 3. نراقب أي تغيير (Change) يحصل في القائمة المتعددة
    multiSelect.addEventListener('change', syncSelections);

    // تشغيل الوظيفة مرة واحدة عند تحميل الصفحة
    syncSelections();
