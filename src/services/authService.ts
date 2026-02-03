import { authApi } from "@/apis/authApi"; 
import { tokenStorage } from "@/utils/tokenStorage";
import type { LoginRequest, SignupRequest } from "@/types/auth";

export const authService = {

  async login(payload: LoginRequest) {
    const res = await authApi.login(payload);
 
    if (res.isSuccess && res.result?.accessToken) {
        tokenStorage.set(res.result.accessToken);
    }
    
    return res;
  },

  async signup(payload: SignupRequest) {
      return await authApi.signup(payload);
  },

  logout() {
    tokenStorage.remove();
  },
};