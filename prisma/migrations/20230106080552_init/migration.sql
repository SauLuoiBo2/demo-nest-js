-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'STAFF');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "hashedRefreshToken" TEXT,
    "forgotToken" TEXT,
    "role" "Role" DEFAULT 'USER',
    "email" TEXT NOT NULL,
    "isGoogle" BOOLEAN NOT NULL DEFAULT false,
    "avatar" TEXT,
    "status" "Status" DEFAULT 'ACTIVE',
    "emailedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'hihi',
    "slug" TEXT NOT NULL,
    "birthday" TEXT DEFAULT '01-09-2022',
    "address" TEXT,
    "story" TEXT,
    "avatar" TEXT,
    "fb_url" TEXT,
    "tiktok_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubjectOnTeacher" (
    "teacherId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "SubjectOnTeacher_pkey" PRIMARY KEY ("teacherId","subjectId")
);

-- CreateTable
CREATE TABLE "Target" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "detail" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Target_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FirstTagOnTarget" (
    "firstTagId" INTEGER NOT NULL,
    "targetId" INTEGER NOT NULL,

    CONSTRAINT "FirstTagOnTarget_pkey" PRIMARY KEY ("firstTagId","targetId")
);

-- CreateTable
CREATE TABLE "FirstTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "detail" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "FirstTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecondTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "detail" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstTagId" INTEGER NOT NULL,

    CONSTRAINT "SecondTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThirdTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "detail" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "secondTagId" INTEGER NOT NULL,

    CONSTRAINT "ThirdTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionOnThirdTag" (
    "questionId" INTEGER NOT NULL,
    "thirdTagId" INTEGER NOT NULL,

    CONSTRAINT "QuestionOnThirdTag_pkey" PRIMARY KEY ("questionId","thirdTagId")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "level" INTEGER NOT NULL DEFAULT 1,
    "description" TEXT,
    "detail" TEXT NOT NULL DEFAULT 'content',
    "video" TEXT,
    "teacherId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "code" TEXT NOT NULL,
    "answerExplain" TEXT,
    "answerVideo" TEXT,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'name',
    "code" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "description" TEXT,
    "teacherId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionOnExercise" (
    "questionId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,

    CONSTRAINT "QuestionOnExercise_pkey" PRIMARY KEY ("questionId","exerciseId")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'name',
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "detail" TEXT,
    "slide" TEXT,
    "order" INTEGER DEFAULT 1,
    "time" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseOnChapter" (
    "chapterId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,

    CONSTRAINT "ExerciseOnChapter_pkey" PRIMARY KEY ("chapterId","exerciseId")
);

-- CreateTable
CREATE TABLE "DocummentOnChapter" (
    "chapterId" INTEGER NOT NULL,
    "docummentId" INTEGER NOT NULL,

    CONSTRAINT "DocummentOnChapter_pkey" PRIMARY KEY ("chapterId","docummentId")
);

-- CreateTable
CREATE TABLE "Documment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "description" TEXT DEFAULT '',
    "detail" TEXT DEFAULT '',
    "url" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Documment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'name',
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "detail" TEXT,
    "content" TEXT,
    "level" INTEGER,
    "thumb" TEXT,
    "color" TEXT,
    "totalTime" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "teacherId" INTEGER,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseOnFirstTag" (
    "courseId" INTEGER NOT NULL,
    "firstTagId" INTEGER NOT NULL,

    CONSTRAINT "CourseOnFirstTag_pkey" PRIMARY KEY ("courseId","firstTagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_key" ON "Subject"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_slug_key" ON "Subject"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_code_key" ON "Subject"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_slug_key" ON "Teacher"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Target_name_key" ON "Target"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Target_slug_key" ON "Target"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "FirstTag_slug_key" ON "FirstTag"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SecondTag_slug_key" ON "SecondTag"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ThirdTag_slug_key" ON "ThirdTag"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Question_code_key" ON "Question"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_code_key" ON "Exercise"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_slug_key" ON "Chapter"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");

-- AddForeignKey
ALTER TABLE "SubjectOnTeacher" ADD CONSTRAINT "SubjectOnTeacher_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectOnTeacher" ADD CONSTRAINT "SubjectOnTeacher_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FirstTagOnTarget" ADD CONSTRAINT "FirstTagOnTarget_firstTagId_fkey" FOREIGN KEY ("firstTagId") REFERENCES "FirstTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FirstTagOnTarget" ADD CONSTRAINT "FirstTagOnTarget_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Target"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FirstTag" ADD CONSTRAINT "FirstTag_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecondTag" ADD CONSTRAINT "SecondTag_firstTagId_fkey" FOREIGN KEY ("firstTagId") REFERENCES "FirstTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThirdTag" ADD CONSTRAINT "ThirdTag_secondTagId_fkey" FOREIGN KEY ("secondTagId") REFERENCES "SecondTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionOnThirdTag" ADD CONSTRAINT "QuestionOnThirdTag_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionOnThirdTag" ADD CONSTRAINT "QuestionOnThirdTag_thirdTagId_fkey" FOREIGN KEY ("thirdTagId") REFERENCES "ThirdTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionOnExercise" ADD CONSTRAINT "QuestionOnExercise_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionOnExercise" ADD CONSTRAINT "QuestionOnExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseOnChapter" ADD CONSTRAINT "ExerciseOnChapter_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseOnChapter" ADD CONSTRAINT "ExerciseOnChapter_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocummentOnChapter" ADD CONSTRAINT "DocummentOnChapter_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocummentOnChapter" ADD CONSTRAINT "DocummentOnChapter_docummentId_fkey" FOREIGN KEY ("docummentId") REFERENCES "Documment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseOnFirstTag" ADD CONSTRAINT "CourseOnFirstTag_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseOnFirstTag" ADD CONSTRAINT "CourseOnFirstTag_firstTagId_fkey" FOREIGN KEY ("firstTagId") REFERENCES "FirstTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
