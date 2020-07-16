
const changementBtn = () => {
    const event = 
        document.querySelector('.btn-custom');
        event.addEventListener('click', () => {
            modeNuit()
        })
    }
        const modeNuit = () => {
            document.querySelectorAll('.container').forEach(container => {
                container.classList.toggle('wrap-sombre')
            })
            document.querySelectorAll('header').forEach(header => {
                header.classList.toggle('wrap-clair')
            })
            document.querySelectorAll('.titleH').forEach(headerTitle => {
                headerTitle.classList.toggle('color-dark')
            })
            document.querySelectorAll('.btn-custom').forEach(btn => {
                btn.classList.toggle('color-dark')
            })
            document.querySelectorAll('.mn').forEach(imgButton => {
                imgButton.classList.toggle('imgButton')
            })
            document.querySelectorAll('.nav-brand').forEach(listHome => {
                listHome.classList.toggle('color-light')
            })
            
            document.querySelectorAll('p').forEach(paragraphe => {
                paragraphe.classList.toggle('color-light')
            })
            document.querySelectorAll('h1').forEach(title1 => {
                title1.classList.toggle('color-light')
            })
            document.querySelectorAll('h2').forEach(title2 => {
                title2.classList.toggle('color-light')
            })
            document.querySelectorAll('h3').forEach(title3 => {
                title3.classList.toggle('color-light')
            })
            document.querySelectorAll('h4').forEach(title4 => {
                title4.classList.toggle('color-light')
            })
            document.querySelectorAll('h5').forEach(title5 => {
                title5.classList.toggle('color-light')
            })
            document.querySelectorAll('tr').forEach(table => {
                table.classList.toggle('wrap-clair')
            })
            document.querySelectorAll('blockquote > p').forEach(blockquote => {
                blockquote.classList.toggle('color-dark')
            })
        }
        changementBtn()