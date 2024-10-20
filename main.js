const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'F8_PLAYER'

const player = $('.player')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {

    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: '1 Phút',
            singer: 'Andiez',
            path: 'https://a128-z3.zmdcdn.me/1c3cb991b9d93d7980d584402c784459?authen=exp=1729525646~acl=/1c3cb991b9d93d7980d584402c784459*~hmac=393283a0b8c7f08523380e6da9343c1d',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/b/3/3/9/b339caaf9ac43b1621cc2a793666748d.jpg'
        },
        {
            name: 'Bầu trời mới',
            singer: 'Da LAB, Minh Tốc & Lam',
            path: 'https://a128-z3.zmdcdn.me/d9a811c367763ecb7881b0c3abb32562?authen=exp=1729526158~acl=/d9a811c367763ecb7881b0c3abb32562*~hmac=ebdce54c4295b216d4a162a132a8edcd',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/6/d/6/b/6d6b0c73f4e0baca963aad99604e689f.jpg'
        },
        {
            name: 'Thanh Xuân',
            singer: 'Da LAB',
            path: 'https://a128-z3.zmdcdn.me/0b56471b51bd9767678dc499cceb0fc4?authen=exp=1729526137~acl=/0b56471b51bd9767678dc499cceb0fc4*~hmac=36cd9696bb3df82449a85ff4f875d440',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/2/e/1/c/2e1ca4018e845d515a5c8c1bd20ec40e.jpg'
        },
        {
            name: 'Muộn rồi mà sao còn',
            singer: 'Sơn Tùng M-TP',
            path: 'https://a128-z3.zmdcdn.me/ed296514b07543c8f29162802af28948?authen=exp=1729525478~acl=/ed296514b07543c8f29162802af28948*~hmac=5de356d103b7817349b270e73b666dbc',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/d/e/b/0/deb0fa47b10ad47197f213244da2fc48.jpg'
        },
        {
            name: 'Gác lại âu lo',
            singer: 'Da LAB, Miu Lê',
            path: 'https://a128-z3.zmdcdn.me/a87be4ebd261a858c45ae5a2a12ec2ad?authen=exp=1729526160~acl=/a87be4ebd261a858c45ae5a2a12ec2ad*~hmac=31db760454d43ea8a5ed5c2461a7ceb4',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/d/5/8/a/d58aa48a38c0a8dc89c95277b456bc75.jpg'
        },
        {
            name: 'Không thể say',
            singer: 'HIEUTHUHAI',
            path: 'https://a128-z3.zmdcdn.me/caa7d09452bca2dd41815083e1628cc2?authen=exp=1729525838~acl=/caa7d09452bca2dd41815083e1628cc2*~hmac=3f786cbba4c99a8a0ff76e1ddf0bb7e2',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/1/0/e/4/10e4d42bb9604e35f971bb0d82fa369d.jpg'
        },
        {
            name: 'Thêm bao nhiêu lâu',
            singer: 'Đạt G',
            path: 'https://a128-z3.zmdcdn.me/652cbb8563db9d5c6dfdf55504bab610?authen=exp=1729525516~acl=/652cbb8563db9d5c6dfdf55504bab610*~hmac=966b73cd069874c6b20e836f67c3450f',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/2/1/a/b/21ab9ad515854e17cb8a23fb50bf43bb.jpg'
        },
        {
            name: 'Cuộc gọi lúc nửa đêm',
            singer: 'AMEE',
            path: 'https://a128-z3.zmdcdn.me/c54ed602de851373e278ccac98eeb13b?authen=exp=1729525790~acl=/c54ed602de851373e278ccac98eeb13b*~hmac=628c60b3a0dd9f9694daf5d414f06e47',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/5/8/d/8/58d8540eca75ec03f087d64e2a02926e.jpg'
        },
    ],
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div
                    class="thumb"
                    style="background-image: url('${song.image}')"
                    ></div>
                    <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>    
                `
        })
        playlist.innerHTML = htmls.join('')
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },
    handleEvents: function () {
        // Gán 1 biến khác để lưu this bên ngoài handleEvents này và this đó là obj app 
        const _this = this
        const cdWidth = cd.offsetWidth
        // Xử lý xoay cdThumb
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }],
            {
                duration: 10000, // 10 seconds
                iterations: Infinity
            }
        )
        cdThumbAnimate.pause()
        // Xử lý phóng to, thu nhỏ CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        // Xử lý khi click play
        playBtn.onclick = function () {
            // Dùng _this như đã khai báo ở trên vì nếu dùng this thì nó là playBtn chứ ko phải obj app
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }
        // Xử lý bài hát play
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        // Xử lý bài hát pause
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }
        // Xử lý tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = audio.currentTime / audio.duration * 100
                progress.value = progressPercent
            }
        }
        // Xử lý tua song
        progress.onchange = (e) => {
            const seekTime = audio.duration * e.target.value / 100
            audio.currentTime = seekTime
        }
        // Xử lý next song
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        // Xử lý prev song
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        // Xử lý random song
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)

            // Nếu random được bật thì vô hiệu hóa nút repeat
            if (_this.isRandom) {
                repeatBtn.disabled = true
                repeatBtn.classList.remove('active') // bỏ active nếu đang bật repeat
                _this.isRepeat = false
                _this.setConfig('isRepeat', _this.isRepeat)
            } else {
                repeatBtn.disabled = false
            }
        }

        // Xử lý lặp lại song
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)

            // Nếu repeat được bật thì vô hiệu hóa nút random
            if (_this.isRepeat) {
                randomBtn.disabled = true
                randomBtn.classList.remove('active') // bỏ active nếu đang bật random
                _this.isRandom = false
                _this.setConfig('isRandom', _this.isRandom)
            } else {
                randomBtn.disabled = false
            }
        }
        // Xử lý bài hát kết thúc thì next song
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play()
            }
            else {
                nextBtn.click()
            }
        }
        // Lắng nghe hành vi click vào playlist
        playlist.onclick = (e) => {
            const songNode = e.target.closest('.song:not(.active)')
            const optionNode = e.target.closest('.option')
            if (songNode || optionNode) {
                // Xử lý khi click vào song
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }
                if (optionNode) {

                }
            }
        }
    },
    scrollToActiveSong: function () {
        setTimeout(function () {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
        }, 300)
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function () {
        // Gán cấu hình từ config vào ứng dụng
        this.loadConfig()
        // Khai báo các thuộc tính và phương thức
        this.defineProperties()
        // Lắng nghe và xử lý các sự kiện
        this.handleEvents()
        // Load thông tin bài hát dầu tiên khi UI chạy vào ứng dụng
        this.loadCurrentSong()
        // Render playlist
        this.render()
        // Hiển thị trạng thái ban đầu của button
        // randomBtn.classList.toggle('active', this.isRandom)
        // repeatBtn.classList.toggle('active', this.isRepeat)
    }
}

app.start()