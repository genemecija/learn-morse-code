const shareLinks = {
    'twitter': {
        name: 'Twitter',
        icon: 'ri-twitter-fill',
        link:'https://twitter.com/intent/tweet?text=Check%20out%20this%20site%20that%20helps%20you%20learn%20Morse%20Code%3A%20https%3A//learnmorsecode.net%20%40genemecija%20%23morse%20%23morsecode'
    },
    'facebook': {
        name: 'Facebook',
        icon: 'ri-facebook-box-fill',
        link: 'https://www.facebook.com/sharer/sharer.php?u=https%3A//learnmorsecode.net'
    },
    'email': {
        name: 'Email',
        icon: "ri-mail-line",
        link: 'mailto:?subject='+encodeURIComponent('Check out this site that helps you learn Morse code! https://learnmorsecode.net')
    }
}
const contactLinks = {
    'email': {
        name: 'Email',
        icon: "ri-mail-line",
        link: 'mailto:gene@genemecija.com?subject='+encodeURIComponent('Hello, Gene!')
    },
    'github': {
        name: 'GitHub',
        icon: 'ri-github-fill',
        link: 'https://github.com/genemecija/learn-morse-code/'
    },
    'twitter': {
        name: 'Twitter',
        icon: 'ri-twitter-fill',
        link:'https://twitter.com/genemecija'
    }
}

export {shareLinks, contactLinks}