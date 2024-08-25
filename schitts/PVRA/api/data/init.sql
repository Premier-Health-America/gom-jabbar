CREATE TABLE "parfums"(
                          "id" BIGINT NOT NULL,
                          "nom" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "parfums" ADD PRIMARY KEY("id");
CREATE TABLE "retours"(
                          "id" BIGINT NOT NULL,
                          "commentaire" TEXT NOT NULL,
                          "client_id" BIGINT NOT NULL,
                          "produit_id" BIGINT NOT NULL
);
ALTER TABLE
    "retours" ADD PRIMARY KEY("id");
CREATE TABLE "produits"(
                           "id" BIGSERIAL NOT NULL,
                           "nom" VARCHAR(255) NOT NULL,
                           "prix" FLOAT(2) NOT NULL,
                           "flair" SMALLINT NOT NULL,
                           "dernier_reapprovisionnement" DATE NOT NULL,
                           "duree_conservation" INTEGER NOT NULL
);
ALTER TABLE
    "produits" ADD PRIMARY KEY("id");
CREATE TABLE "clients"(
                          "id" BIGINT NOT NULL,
                          "type_client" VARCHAR(255) NOT NULL,
                          "parfum_prefere_id" INTEGER NULL,
                          "produit_prefere_id" BIGINT NULL
);
ALTER TABLE
    "clients" ADD PRIMARY KEY("id");
CREATE TABLE "commandes"(
                            "id" BIGINT NOT NULL,
                            "date" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
                            "produit_id" BIGINT NOT NULL,
                            "humeur" VARCHAR(255) NOT NULL,
                            "nombre_clients" INTEGER NOT NULL,
                            "repartition_addition" INTEGER NOT NULL
);
ALTER TABLE
    "commandes" ADD PRIMARY KEY("id");
ALTER TABLE
    "commandes" ADD CONSTRAINT "commandes_produit_id_foreign" FOREIGN KEY("produit_id") REFERENCES "produits"("id");
ALTER TABLE
    "clients" ADD CONSTRAINT "clients_produit_prefere_id_foreign" FOREIGN KEY("produit_prefere_id") REFERENCES "produits"("id");
ALTER TABLE
    "clients" ADD CONSTRAINT "clients_parfum_prefere_id_foreign" FOREIGN KEY("parfum_prefere_id") REFERENCES "parfums"("id");
ALTER TABLE
    "retours" ADD CONSTRAINT "retours_client_id_foreign" FOREIGN KEY("client_id") REFERENCES "clients"("id");
ALTER TABLE
    "retours" ADD CONSTRAINT "retours_produit_id_foreign" FOREIGN KEY("produit_id") REFERENCES "produits"("id");
