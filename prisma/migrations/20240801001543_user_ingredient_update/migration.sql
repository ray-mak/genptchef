-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_userId_fkey";

-- CreateIndex
CREATE INDEX "Ingredient_userId_idx" ON "Ingredient"("userId");

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
