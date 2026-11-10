// Change 'DOMContentLoaded' to 'layoutReady' on window listener
window.addEventListener('layoutReady', () => {
    // Configuration
    const CORRECT_PASSCODE = "01221896"; 
    const triggerBtn = document.getElementById('triggerBtn');
    const overlay = document.getElementById('passcodeOverlay');
    const cancelBtn = document.getElementById('cancelBtn');
    const pinInputs = document.querySelectorAll('.pin-input');
    const errorMessage = document.getElementById('errorMessage');

    // SAFE GUARD
    if (!triggerBtn) {
        return; 
    }

    // Open Requester Overlay
    triggerBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        console.log("Button clicked!");
        if (overlay) overlay.classList.add('active');
        resetPasscode();
        if (pinInputs.length > 0) pinInputs[0].focus(); 
    });

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (overlay) overlay.classList.remove('active');
        });
    }

    pinInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            if (!/^\d*$/.test(value)) {
                e.target.value = '';
                return;
            }
            if (value.length === 1 && index < pinInputs.length - 1) {
                pinInputs[index + 1].focus();
            }
            if (getEnteredPasscode().length === pinInputs.length) {
                verifyPasscode();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !input.value && index > 0) {
                pinInputs[index - 1].focus();
            }
        });
    });

    function getEnteredPasscode() {
        let code = '';
        pinInputs.forEach(input => code += input.value);
        return code;
    }

     function verifyPasscode() {
        const entered = getEnteredPasscode();
        // Dynamic re-lookup to bypass template engine decoupling bugs
        const currentErrorMsg = document.getElementById('errorMessage');
        
        if (entered === CORRECT_PASSCODE) {
            if (currentErrorMsg) currentErrorMsg.style.display = 'none'; 
            if (overlay) overlay.classList.remove('active');
            
            // Success: Smoothly redirect to target page
            window.location.href = triggerBtn.getAttribute('href'); 
        } else {
            console.log("wrong");
            if (currentErrorMsg) {
                currentErrorMsg.style.setProperty('display', 'block', 'important'); // Overrides hidden template variables
            } else {
                console.error("errorMessage container element could not be found in active viewport!");
            }
            resetPasscode(false); // Reset boxes but preserve the visible error flag
            if (pinInputs.length > 0) pinInputs[0].focus(); 
        }
    }

    function resetPasscode(hideError = true) {
        pinInputs.forEach(input => input.value = '');
        if (hideError) {
            const currentErrorMsg = document.getElementById('errorMessage');
            if (currentErrorMsg) currentErrorMsg.style.display = 'none';
        }
    }

});
