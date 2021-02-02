import React from 'react';

import fluxLogoBlack from '../../assets/images/flux-logo-black.png';
import fluxLogoWhite from '../../assets/images/flux-logo-white.png';
import twitterLogo from '../../assets/images/icons/twitter_logo.png';
import telegramLogo from '../../assets/images/icons/telegram_logo.png';
import { useDarkModeThemeContext } from '../../utils/hooks/useDarkModeTheme';

import s from './Footer.module.scss';

export default function Footer() {
    const { theme } = useDarkModeThemeContext();

    return (
        <footer className={s.root}>
            <div className={s.wrapper}>
                <img className={s.logo} src={theme === 'light' ? fluxLogoBlack : fluxLogoWhite} alt="Flux home" />
                <div className={s.socials}>
                    <a href="https://twitter.com/fluxprotocol" className={s.social} rel="noopener noreferrer" target="_blank" >
                        <img src={twitterLogo} alt="Twitter page" />
                    </a>
                    <a href="https://t.me/fluxprotocol" className={s.social} rel="noopener noreferrer" target="_blank" >
                        <img src={telegramLogo} alt="Telegram group" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
