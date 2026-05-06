import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포 시 레포 이름으로 변경하세요
  // 예: 레포 이름이 mju-cafeteria 라면 그대로 두면 됩니다
  base: "/mju-cafeteria/",
});
