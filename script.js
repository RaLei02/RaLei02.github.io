// 背景音乐控制
let isPlaying = false;

async function playMusic() {
    try {
        await bgMusic.play();
        isPlaying = true;
        musicControl.classList.add('playing');
        musicControl.querySelector('.music-text').textContent = 'Forest Mixtape';
    } catch (e) {
        console.error('音乐播放失败:', e);
        musicControl.querySelector('.music-text').textContent = 'Forest Mixtape';
    }
}

musicControl.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicControl.classList.remove('playing');
        musicControl.querySelector('.music-text').textContent = 'Forest Mixtape';
        isPlaying = false;
    } else {
        playMusic();
    }
});

// 页面加载后自动播放音乐
playMusic();

// 初始化时预加载音频
bgMusic.addEventListener('loadedmetadata', () => {
    console.log('音频加载完成');
});

bgMusic.addEventListener('error', (e) => {
    console.error('音频加载错误:', e);
    musicControl.querySelector('.music-text').textContent = '音频加载失败';
});

// 图片查看器
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImages = [];
let currentIndex = 0;

// 收集所有可点击的图片
function collectImages() {
    const allImages = document.querySelectorAll('.gallery-image, .award-item img');
    currentImages = Array.from(allImages).map(img => ({
        src: img.src,
        caption: img.dataset.caption || img.alt || ''
    }));
}

// 打开图片查看器
function openLightbox(index) {
    collectImages();
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
}

// 更新图片查看器内容
function updateLightbox() {
    const imgData = currentImages[currentIndex];
    lightboxImage.src = imgData.src;
    lightboxCaption.textContent = imgData.caption;
}

// 关闭图片查看器
function closeLightbox() {
    lightbox.classList.remove('active');
}

// 上一张图片
function prevImage() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateLightbox();
}

// 下一张图片
function nextImage() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightbox();
}

// 绑定图片点击事件
document.querySelectorAll('.gallery-image').forEach((img, index) => {
    img.addEventListener('click', () => {
        collectImages();
        const globalIndex = currentImages.findIndex(i => i.src === img.src);
        openLightbox(globalIndex);
    });
});

document.querySelectorAll('.award-item img').forEach((img) => {
    img.addEventListener('click', () => {
        collectImages();
        const globalIndex = currentImages.findIndex(i => i.src === img.src);
        openLightbox(globalIndex);
    });
});

// 图片查看器控制按钮
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', prevImage);
lightboxNext.addEventListener('click', nextImage);

// 点击背景关闭
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// 键盘控制
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    }
});

// 滚动动画
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // 当元素进入视口 80% 时触发动画
        if (rect.top < windowHeight * 0.85) {
            el.classList.add('visible');
        }
    });
}

// 初始化时检查一次
handleScrollAnimation();

// 滚动时检查
window.addEventListener('scroll', handleScrollAnimation, { passive: true });

// 平滑滚动到指定部分
document.querySelectorAll('.scroll-hint').forEach(hint => {
    hint.addEventListener('click', () => {
        const firstSection = document.querySelector('.content-section');
        if (firstSection) {
            firstSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 封面标题动画增强
const coverTitle = document.querySelector('.cover-title');
if (coverTitle) {
    // 鼠标悬停效果
    coverTitle.addEventListener('mouseenter', () => {
        coverTitle.style.transform = 'scale(1.05)';
        coverTitle.style.transition = 'transform 0.3s ease';
    });
    coverTitle.addEventListener('mouseleave', () => {
        coverTitle.style.transform = 'scale(1)';
    });
}

// 页面加载完成后的初始化
window.addEventListener('load', () => {
    // 添加加载完成动画
    document.body.style.opacity = '1';
    
    // 延迟显示音乐控制按钮
    setTimeout(() => {
        musicControl.style.opacity = '1';
        musicControl.style.transform = 'translateY(0)';
    }, 500);
});

// 预加载图片（可选）
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'image';
            preloadLink.href = src;
            document.head.appendChild(preloadLink);
        }
    });
}

// 调用预加载
preloadImages();

// 添加返回顶部按钮（可选）
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #8B4513;
    color: #fff;
    font-size: 24px;
    border: none;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
`;
document.body.appendChild(scrollTopBtn);

// 控制返回顶部按钮显示
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.transform = 'translateY(20px)';
    }
});

// 点击返回顶部
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 悬停效果
scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.background = '#D2691E';
    scrollTopBtn.style.transform = 'scale(1.1)';
});
scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.background = '#8B4513';
    scrollTopBtn.style.transform = 'scale(1)';
});

console.log('网页加载完成，欢迎使用！');