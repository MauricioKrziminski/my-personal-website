module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      // Adicionando a fonte Poppins
      fontFamily: {
        poppins: ["'Poppins', sans-serif"],
      },
      // Customizando cores
      colors: {
        customGray: '#443c3c',
        customOrange: '#ff8500', // Um exemplo, ajuste conforme a cor exata que deseja
      },
      // Ajustando outras propriedades conforme necessário
      spacing: {
        // Exemplo: Adicionando valores customizados de spacing
        '22': '5.5rem', // Para margens, padding, etc.
      },
      borderRadius: {
        // Exemplo: Adicionando um borderRadius customizado
        extra: '10px',
      },
      borderWidth: {
        // Para bordas customizadas
        '3': '3px',
      },
      transitionProperty: {
        // Para propriedades de transição customizadas
        colors:
          'color, background-color, border-color, text-decoration-color, fill, stroke',
      },
      transitionDuration: {
        // Para durações de transição customizadas
        '300': '300ms',
      },
    },
  },
  plugins: [],
}
