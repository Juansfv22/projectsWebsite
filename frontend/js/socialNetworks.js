const socialData = [
  {
    name: 'Email',
    url: 'mailto:juanse3222@gmail.com',
    iconName: 'mail',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/juan-sebastian-fernadez-73b3313b8/',
    iconName: 'linkedin--v1',
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/573006094875',
    iconName: 'whatsapp--v1',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/Juansfv22',
    iconName: 'github--v1',
  },
  {
    name: 'CV',
    url: 'https://drive.google.com/file/d/1nZDcrz8cYlm0-0_cA9MUNNNeyU3yEYFH/view?usp=sharing',
    iconName: 'resume',
  }
]

const container = document.getElementById('social-networks')

socialData.forEach(net => {
  container.innerHTML += `
    <a href="${net.url}" class="p-1 rounded-full transition-colors hover:bg-white/80" target="_blank" rel="noopener noreferrer">
      <img src="https://img.icons8.com/20B2AA/ios/100/${net.iconName}.png" alt="${net.name}" class="w-10 h-10 object-contain"/>
    </a>
  `
})