module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["'Poppins', sans-serif"],
      },
      colors: {
        customGray: '#443c3c',
      },
      spacing: {
        '22': '5.5rem',
      },
      borderRadius: {
        extra: '10px',
      },
      borderWidth: {
        '3': '3px',
      },
      transitionProperty: {
        colors:
          'color, background-color, border-color, text-decoration-color, fill, stroke',
      },
      transitionDuration: {
        '300': '300ms',
      },
      boxShadow: {
        glow: '0 0 12px 14px rgba(29, 78, 216, 0.6)',
      },
    },
  },
  plugins: [],
}
