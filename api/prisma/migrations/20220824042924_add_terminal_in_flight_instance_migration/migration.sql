-- AddForeignKey
ALTER TABLE "Flight_Instance" ADD CONSTRAINT "Flight_Instance_terminal_id_fkey" FOREIGN KEY ("terminal_id") REFERENCES "Terminal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
