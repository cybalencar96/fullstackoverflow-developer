CREATE TABLE "questions" (
	"id" serial NOT NULL,
	"question" TEXT NOT NULL,
	"student" varchar(255) NOT NULL,
	"classs" varchar(3) NOT NULL,
	"tags" varchar(255) NOT NULL,
	"submitedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	"answer" TEXT,
	"answeredBy" int,
	"answeredAt" TIMESTAMP WITH TIME ZONE,
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

ALTER TABLE "questions" ADD CONSTRAINT "questions_fk1" FOREIGN KEY ("answeredBy") REFERENCES "users"("id");





