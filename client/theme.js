export default {
    global: {
      colors: {
        brand: '#2f4050',
        control: {
          dark: '#00A8F0',
          light: '#2f4050',
        },
        focus: 'transparent',
        'neutral-1': '#006996',
        'neutral-2': '#A65336',
        'neutral-3': '#A69136',
        'neutral-4': '#774677',
        'accent-1': '#E6734B',
        'accent-2': '#E6C84B',
        'accent-3': '#915591',
        'status-critical': '#F04B37',
        'status-warning': '#F0AA3C',
        'status-ok': '#509137',
        'status-unknown': '#848484',
        'status-disabled': '#848484',
        'dark-1': '#000001',
        'dark-2': '#676767',
        'light-1': '#F2F2F2',
        'light-2': '#E8E8E8',
        'light-3': '#CCCCCC',
      },
      font: {
        family: "'ptsans', Arial, sans-serif",
        face: `
          @font-face {
            font-family: 'ptsans';
            src: url(/ptsans.woff\") format('woff');
          }
        `,
      },
    },
    anchor: {
      color: {
        dark: '#00A8F0',
        light: '#2f4050',
      },
      extend: `
        &.github {
          outline-color: 'transparent';
          border-color: 'transparent';
        }
      `,
    },
    button: {},
    grommet: {
      extend: `
        *::-webkit-scrollbar-track
        {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            background-color: rgba(100,100,100,0.2);
        }

        *::-webkit-scrollbar
        {
            width: 10px;
            background-color: rgba(100,100,100,0.2);
        }

        *::-webkit-scrollbar-thumb
        {
            background-color: #000000;
        }

        *::-webkit-scrollbar-corner {
          background-color: rgba(100,100,100,0.2);
        }
      `,
    },
    stack: {},
}
