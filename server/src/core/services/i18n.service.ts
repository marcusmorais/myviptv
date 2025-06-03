// src/core/services/i18n.service.ts
import { Injectable } from '@nestjs/common';
import { USER_MESSAGES as EN_USER, PLAYLIST_MESSAGES as EN_PLAYLIST } from '.././constants/messages/en';
import { USER_MESSAGES as PT_USER, PLAYLIST_MESSAGES as PT_PLAYLIST } from '.././constants/messages/pt';

type Language = 'en' | 'pt';
type MessageKey = keyof typeof EN_USER | keyof typeof EN_PLAYLIST;

@Injectable()
export class I18nService {
  private readonly messages = {
    en: { ...EN_USER, ...EN_PLAYLIST },
    pt: { ...PT_USER, ...PT_PLAYLIST },
  };

  getMessage(key: MessageKey, lang: Language = 'en'): string {
    return this.messages[lang][key] || this.messages.en[key];
  }
}