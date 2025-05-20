import { z } from "zod";

// TYPE
interface ProfileDTO {
  email?: string;
  email_needs_agreement?: boolean;
  has_email?: boolean;
  has_phone_number?: boolean;
  is_email_valid?: boolean;
  is_email_verified?: boolean;
  name?: string;
  name_needs_agreement?: boolean;
  phone_number?: string;
  phone_number_needs_agreement?: boolean;
  profile_nickname_needs_agreement?: boolean;
  profile?: { is_default_nickname?: boolean; nickname?: string };
  properties?: {
    nickname?: string;
  };
}

export interface KakaoDTO {
  id: number;
  connected_at: string;
  kakao: ProfileDTO;
}
