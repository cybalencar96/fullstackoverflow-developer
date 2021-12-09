CREATE TABLE "questions" (
	"id" serial NOT NULL,
	"question" TEXT NOT NULL,
	"user_id" int NOT NULL,
	"submited_at" DATE NOT NULL DEFAULT NOW(),
	"answer" TEXT,
	"answered_by" int,
	"aswered_at" DATE,
	CONSTRAINT "questions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"class" varchar(3) NOT NULL,
	"token" varchar(36) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "questions" ADD CONSTRAINT "questions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "questions" ADD CONSTRAINT "questions_fk1" FOREIGN KEY ("answered_by") REFERENCES "users"("id");



