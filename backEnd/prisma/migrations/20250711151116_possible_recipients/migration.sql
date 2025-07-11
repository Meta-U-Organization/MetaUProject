-- CreateTable
CREATE TABLE "_possibleRecipients" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_possibleRecipients_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_possibleRecipients_B_index" ON "_possibleRecipients"("B");

-- AddForeignKey
ALTER TABLE "_possibleRecipients" ADD CONSTRAINT "_possibleRecipients_A_fkey" FOREIGN KEY ("A") REFERENCES "donationPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_possibleRecipients" ADD CONSTRAINT "_possibleRecipients_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
