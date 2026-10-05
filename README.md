# Spa Bella Vita — Saúde e Beleza

Landing page institucional do **spa bella vita** (Fraiburgo - SC), feita com HTML5, Tailwind CSS (CDN) e JavaScript nativo com GSAP 3 + ScrollTrigger.

## Estrutura

```
index.html        # Página (SEO, JSON-LD, seções)
css/styles.css    # Tokens da marca, glass, botões, estados de animação
js/main.js        # Status Aberto/Fechado em tempo real, menu mobile, GSAP
js/reviews.js     # Avaliações reais de clientes no Google (sem respostas da loja)
assets/           # logo.png, butterfly.png (transparentes) e logo-original.png
```

## Recursos

- Design system baseado na logo: verde esmeralda/menta + lima da borboleta, off-white e grafite.
- Serviços especializados em destaque: **Podóloga**, **Massoterapeuta**, **Terapeuta** e **Salão de Beleza** (além de estética facial e cuidados corporais).
- Seção de **Avaliações reais do Google**: depoimentos reais com avatar de iniciais, selo Local Guide e paginação interativa "Ver mais avaliações".
- Badge **🟢 Aberto Agora / 🔴 Fechado no Momento** calculada no fuso de Brasília, com destaque do dia atual.
- Animações GSAP: hero em cascata (`stagger: 0.15`), reveal por ScrollTrigger (`y: 35`, `duration: 0.8`), borboleta/glow com `yoyo` + `sine.inOut`.
- Respeita `prefers-reduced-motion`; foco visível e navegação por teclado.
- Botão flutuante de WhatsApp, rota no Google Maps, Instagram e e-mail.

## Rodar localmente

Basta abrir `index.html` ou servir a pasta:

```bash
python -m http.server 8000
```

## Contatos oficiais

- WhatsApp: https://api.whatsapp.com/send?phone=5549991331919
- Instagram: https://www.instagram.com/spa.bellavita.saudeebeleza/
- E-mail: spa_bellavita@hotmail.com
- Endereço: Avenida Carlos Maister, 146, Fraiburgo - SC, 89580-000
