const singleSelect = document.getElementById('singleSelect');
const multiSelect = document.getElementById('multiSelect');
const confirmBtn = document.getElementById('confirmBtn');

confirmBtn.addEventListener('click', () => {
    // 1. نجيب المصفوفة بتاعة الحاجات اللي اخترناها من القائمة المتعددة
    const selectedFromMulti = Array.from(multiSelect.selectedOptions);
       
    if (selectedFromMulti.length === 0) {
        alert("اختار مواعيد من القائمة المتعددة الأول");
        return;
    }

    // 2. نلف على كل اختيار اخترناه
    selectedFromMulti.forEach(multiOption => {
        const valueToRemove = multiOption.value;
       console.log(valueToRemove);
        // 3. ندور على الموعد اللي زيه في القائمة الأولى ونمسحه
        for (let i = 0; i < singleSelect.options.length; i++) {
            if (singleSelect.options[i].value === valueToRemove) {
                singleSelect.remove(i); 
                break; // نوقف اللوب عشان لقيناه خلاص
            }
        }

        // 4. نمسح الموعد من القائمة المتعددة نفسها كمان
        multiOption.remove();
    });

    alert("تم الحجز بنجاح وتم تحديث القائمتين!");
});