import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({

   palette: {
      primary: {
         main: '#E5554F',
      },
      secondary: {
         main: '#009688',
      },
      default: {
         main: '#dc0909'
      },
      background: {
         default: "#fff"
      }
   },

  
   typography: {
      fontFamily: "\"Gibson-Regular\", \"sans-serif\"",
      fontSize: "1.6rem",
      button: {
         fontSize: "1.6rem",
         textTransform: "capitalize",
         fontWeight: 500,
         fontFamily: "\"Gibson-Regular\", \"sans-serif\"",
         color: "rgba(255, 255, 255, 1)"
      }
   },
});

export default theme;