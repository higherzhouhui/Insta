import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    font-display: auto;
    /* @font-face {
        font-family: 'HarmonyOs-Black';
        src: url('/static/font/HarmonyOS_Sans_Black.ttf');
    }
    @font-face {
        font-family: 'HarmonyOs-Bold';
        src: url('/static/font/HarmonyOS_Sans_Bold.ttf');
    }
    @font-face {
        font-family: 'HarmonyOs-Light';
        src: url('/static/font/HarmonyOS_Sans_Light.ttf');
    }
    @font-face {
        font-family: 'HarmonyOs-Medium';
        src: url('/static/font/HarmonyOS_Sans_Medium.ttf');
    }
    @font-face {
        font-family: 'HarmonyOs-Regular';
        src: url('/static/font/HarmonyOS_Sans_Regular.ttf');
    }

    @font-face {
        font-family: 'HarmonyOs-Thin';
        src: url('/static/font/HarmonyOS_Sans_Thin.ttf');
    } */

    body, div, dl, dt, dd, ul, li, h1, h2, h3, h4, h5, h6, input, p, form, a, textarea, header{
        margin: 0;
        padding: 0;
        font-size: 12px; 
        font-family: HarmonyOs-Regular;
        box-sizing: border-box;
    }
    html, body{
        width: 100%;
        height: 100%;
        max-width: 100vw;
        overflow: hidden;
    }
    
    ol, ul, li {
        list-style: none;
    }
    
    a {
        text-decoration: none;
        display: block;
    }
    
    img{
        border: none;
        display: block;
    }
    
    /* 给需要清除浮动的标签的class加上clearfloat类 */
    .clearfloat {  
        zoom: 1;        /* 适配IE */
    }
    .clearfloat:after {
        display: block;
        clear: both;
        content: '';
        visibility: hidden;
        height: 0;  
    }

    .show {
        display: block;
    }

    .hide {
        display: none;
    }

    .fadeIn {
        animation: appear 0.5s forwards;
    }
    .fadeOut {
        animation: disappear 0.5s forwards;
    }
    @keyframes appear {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes disappear {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    /* 隐藏google人机验证 */
    .grecaptcha-badge{
        display: none;
    }
    .themeColor {
      background: #F5F8FB;
    }
    .ant-table-cell {
        background: rgb(182 191 216)!important;
        color: #2a2323!important;
    }
    .ant-table-column-title {
        color: #2a2323!important;
    }
    #nprogress {
        .bar {
            background: #fff;
            height: 4px;
        }
    }
    .loading {
		position: relative;
		max-height: 100vh;
		&::before {
			position: fixed;
			width: 100px;
			height: 100px;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -45%);
			background: #333;
			content: "loading...";
			color: #fff;
			text-align: center;
			box-sizing: border-box;
			padding-top: 70px;
			z-index: 999;
			border-radius: 20px;
		}
		&::after {
			position: fixed;
			z-index: 999;
			width: 20px;
			height: 20px;
			border: 2px solid #555;
			border-top: 2px solid #f3f3f3;
			border-radius: 50%;
			top: 50%;
			left: 50%;
			margin-left: -10px;
			margin-top: -10px;
			content: "";
			animation: spin 1s linear infinite;
		}
	}
    
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
    .dropDown {
        color: #fff;
    }
`;
