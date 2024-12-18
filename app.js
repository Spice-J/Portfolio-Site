const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controlls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');

// Contact Form

// Form Validation and Submission Script
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const nameInput = form.querySelector('input[placeholder="YOUR NAME"]');
    const emailInput = form.querySelector('input[placeholder="YOUR EMAIL"]');
    const subjectInput = form.querySelector('input[placeholder="ENTER SUBJECT"]');
    const messageInput = form.querySelector('textarea');
    const submitBtn = form.querySelector('.main-btn');

    // Input validation functions
    function validateName(name) {
        // Minimum 2 characters, only letters and spaces
        return /^[A-Za-z\s]{2,50}$/.test(name.trim());
    }

    function validateEmail(email) {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }

    function validateSubject(subject) {
        // Subject should be 3-100 characters
        return subject.trim().length >= 3 && subject.trim().length <= 100;
    }

    function validateMessage(message) {
        // Message should be 10-500 characters
        return message.trim().length >= 10 && message.trim().length <= 500;
    }

    // Prevent XSS by sanitizing input
    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }

    // Show error messages
    function showError(input, message) {
        // Remove any existing error
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Create and append error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '0.8rem';
        errorElement.textContent = message;
        input.parentElement.appendChild(errorElement);
        input.style.borderColor = 'red';
    }

    // Clear error messages
    function clearError(input) {
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        input.style.borderColor = '';
    }

    // Validate inputs on blur
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(input);
        });
    });

    // Input validation function
    function validateInput(input) {
        const value = input.value.trim();
        
        // Clear previous errors
        clearError(input);

        // Validate based on input type
        if (input === nameInput && !validateName(value)) {
            showError(input, 'Please enter a valid name (2-50 letters)');
            return false;
        }

        if (input === emailInput && !validateEmail(value)) {
            showError(input, 'Please enter a valid email address');
            return false;
        }

        if (input === subjectInput && !validateSubject(value)) {
            showError(input, 'Subject must be 3-100 characters');
            return false;
        }

        if (input === messageInput && !validateMessage(value)) {
            showError(input, 'Message must be 10-500 characters');
            return false;
        }

        return true;
    }

    // Form submission handler
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();

        // Validate all inputs
        const isNameValid = validateInput(nameInput);
        const isEmailValid = validateInput(emailInput);
        const isSubjectValid = validateInput(subjectInput);
        const isMessageValid = validateInput(messageInput);

        // If all validations pass
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Prevent multiple submissions
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.5';

            // Prepare form data
            const formData = {
                name: sanitizeInput(nameInput.value.trim()),
                email: sanitizeInput(emailInput.value.trim()),
                subject: sanitizeInput(subjectInput.value.trim()),
                message: sanitizeInput(messageInput.value.trim())
            };

            // Simulate a fetch request since no backend service is being used
            fetch('/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add CSRF token if available
                    // 'X-CSRF-Token': csrfToken
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Success handling
                alert('Message sent successfully!');
                form.reset(); // Clear form
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to send message. Please try again.');
            })
            .finally(() => {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            });
        }
    });
});



function PageTransitions() {
    //button click active class
    for (let i = 0; i < sectBtn.length; i++){
        sectBtn[i].addEventListener('click', function(){
            let currentBtn = document.querySelectorAll('.active-btn');
            currentBtn[0].className = currentBtn[0].className.replace('active-btn', '')
            this.className += ' active-btn';
        })
    }

    //sections active class
    allSections.addEventListener('click', (e) =>{
        const id = e.target.dataset.id;
        if(id){
            //remove selected from the other buttons
            sectBtns.forEach((btn) =>{
                btn.classList.remove('active')
            })
            e.target.classList.add('active')

            //hide other sections
            sections.forEach((section)=>{
                section.classList.remove('active')
            })

            const element = document.getElementById(id);
            element.classList.add('active');
        }
    })

    //toggle theme
    const themeBtn = document.querySelector('.theme-btn');
    themeBtn.addEventListener('click', () =>{
        let element = document.body;
        element.classList.toggle('light-mode')
    })

    //porfolio icon link descriptions
    //show source code description
    let sourceCode = document.querySelectorAll('.active-icon');

    const activeIcon = document.querySelectorAll('.code-icon')

    for (let i = 0; i < activeIcon.length; i++) {
        for (let j = 0; j < sourceCode.length; j++) {
        activeIcon[i].addEventListener("mouseenter", function() {
          sourceCode[j].innerHTML = "source code";
        })};
    }

    //hide source code desctription
    const removeDesc = document.querySelectorAll('.code-icon')

    for (let i = 0; i < removeDesc.length; i++) {
        for (let j = 0; j < sourceCode.length; j++) {
        removeDesc[i].addEventListener("mouseleave", function() {
          sourceCode[j].innerHTML = "";
        })};
    }

    //show live website description
    const activeIcon2 = document.querySelectorAll('.code-icon2')

    for (let i = 0; i < activeIcon2.length; i++) {
        for (let j = 0; j < sourceCode.length; j++) {
        activeIcon2[i].addEventListener("mouseenter", function() {
          sourceCode[j].innerHTML = "live website";
        })};
    }

    //hide live website description
    const removeDesc2 = document.querySelectorAll('.code-icon2')

    for (let i = 0; i < removeDesc2.length; i++) {
        for (let j = 0; j < sourceCode.length; j++) {
        removeDesc2[i].addEventListener("mouseleave", function() {
          sourceCode[j].innerHTML = "";
        })};
    }
}

PageTransitions();