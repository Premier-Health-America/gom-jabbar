--
-- PostgreSQL database dump
--

-- Dumped from database version 13.16 (Debian 13.16-1.pgdg120+1)
-- Dumped by pg_dump version 13.16 (Debian 13.16-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: nurse_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.nurse_status AS ENUM (
    'Patient care',
    'In motion',
    'At rest',
    'SOS'
);


ALTER TYPE public.nurse_status OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: facilities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.facilities (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    latitude numeric(9,6) NOT NULL,
    longitude numeric(9,6) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.facilities OWNER TO postgres;

--
-- Name: facilities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.facilities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.facilities_id_seq OWNER TO postgres;

--
-- Name: facilities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.facilities_id_seq OWNED BY public.facilities.id;


--
-- Name: locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locations (
    id integer NOT NULL,
    nurse_id integer,
    latitude numeric(9,6) NOT NULL,
    longitude numeric(9,6) NOT NULL,
    status public.nurse_status,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.locations OWNER TO postgres;

--
-- Name: locations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locations_id_seq OWNER TO postgres;

--
-- Name: locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locations_id_seq OWNED BY public.locations.id;


--
-- Name: nurse_supplies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nurse_supplies (
    id integer NOT NULL,
    nurse_id integer,
    supply_id integer,
    quantity integer NOT NULL,
    restocking_in_progress boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.nurse_supplies OWNER TO postgres;

--
-- Name: nurse_supplies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nurse_supplies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nurse_supplies_id_seq OWNER TO postgres;

--
-- Name: nurse_supplies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nurse_supplies_id_seq OWNED BY public.nurse_supplies.id;


--
-- Name: nurses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nurses (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.nurses OWNER TO postgres;

--
-- Name: nurses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nurses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nurses_id_seq OWNER TO postgres;

--
-- Name: nurses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nurses_id_seq OWNED BY public.nurses.id;


--
-- Name: patient_records; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.patient_records (
    id integer NOT NULL,
    facility_id integer,
    patient_name character varying(100),
    record text,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.patient_records OWNER TO postgres;

--
-- Name: patient_records_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.patient_records_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.patient_records_id_seq OWNER TO postgres;

--
-- Name: patient_records_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.patient_records_id_seq OWNED BY public.patient_records.id;


--
-- Name: supplies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.supplies (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.supplies OWNER TO postgres;

--
-- Name: supplies_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.supplies_history (
    id integer NOT NULL,
    nurse_supply_id integer,
    type character varying(20) NOT NULL,
    quantity integer NOT NULL,
    delivery_date timestamp without time zone,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT supplies_history_type_check CHECK (((type)::text = ANY (ARRAY[('consumption'::character varying)::text, ('restock'::character varying)::text])))
);


ALTER TABLE public.supplies_history OWNER TO postgres;

--
-- Name: supplies_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.supplies_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.supplies_history_id_seq OWNER TO postgres;

--
-- Name: supplies_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.supplies_history_id_seq OWNED BY public.supplies_history.id;


--
-- Name: supplies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.supplies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.supplies_id_seq OWNER TO postgres;

--
-- Name: supplies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.supplies_id_seq OWNED BY public.supplies.id;


--
-- Name: facilities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facilities ALTER COLUMN id SET DEFAULT nextval('public.facilities_id_seq'::regclass);


--
-- Name: locations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations ALTER COLUMN id SET DEFAULT nextval('public.locations_id_seq'::regclass);


--
-- Name: nurse_supplies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nurse_supplies ALTER COLUMN id SET DEFAULT nextval('public.nurse_supplies_id_seq'::regclass);


--
-- Name: nurses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nurses ALTER COLUMN id SET DEFAULT nextval('public.nurses_id_seq'::regclass);


--
-- Name: patient_records id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient_records ALTER COLUMN id SET DEFAULT nextval('public.patient_records_id_seq'::regclass);


--
-- Name: supplies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.supplies ALTER COLUMN id SET DEFAULT nextval('public.supplies_id_seq'::regclass);


--
-- Name: supplies_history id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.supplies_history ALTER COLUMN id SET DEFAULT nextval('public.supplies_history_id_seq'::regclass);


--
-- Data for Name: facilities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.facilities (id, name, latitude, longitude, created_at, updated_at) FROM stdin;
1	Frostbite General Hospital	45.493100	-73.587200	2024-09-20 13:03:11.239103	2024-09-20 13:03:11.239103
2	Snowfall Medical Center	45.496100	-73.629400	2024-09-20 13:03:11.239103	2024-09-20 13:03:11.239103
3	Glacier Point Health Clinic	45.511100	-73.558700	2024-09-20 13:03:11.239103	2024-09-20 13:03:11.239103
4	Blizzard Bay Recovery	45.571500	-73.563400	2024-09-20 13:03:11.239103	2024-09-20 13:03:11.239103
5	Arctic Breeze Health Hub	45.454700	-73.811400	2024-09-20 13:03:11.239103	2024-09-20 13:03:11.239103
6	Icecap Urgent Care	45.426000	-73.635300	2024-09-20 13:03:11.239103	2024-09-20 13:03:11.239103
7	Polar Vortex Wellness	45.489200	-73.625300	2024-09-20 13:03:11.239103	2024-09-20 13:03:11.239103
8	Shiver Peak Children’s Hospital	45.494400	-73.585100	2024-09-20 13:03:11.239103	2024-09-20 13:03:11.239103
9	Frosty Pines Rehabilitation	45.503100	-73.617700	2024-09-20 13:03:11.239103	2024-09-20 13:03:11.239103
10	Frozen Lake Medical Pavilion	45.457900	-73.569700	2024-09-20 13:03:11.239103	2024-09-20 13:03:11.239103
\.


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locations (id, nurse_id, latitude, longitude, status, updated_at, created_at) FROM stdin;
1	1	45.540966	-73.542749	In motion	2024-09-20 13:24:24.414529	2024-09-20 13:24:24.414529
\.


--
-- Data for Name: nurse_supplies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nurse_supplies (id, nurse_id, supply_id, quantity, restocking_in_progress, updated_at, created_at) FROM stdin;
1	1	1	10	f	2024-09-20 13:36:22.963835	2024-09-20 13:36:22.963835
2	1	2	5	t	2024-09-20 13:36:22.963835	2024-09-20 13:36:22.963835
3	1	3	7	f	2024-09-20 13:36:22.963835	2024-09-20 13:36:22.963835
\.


--
-- Data for Name: nurses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nurses (id, username, password, updated_at, created_at) FROM stdin;
1	test	$2a$10$GazAeEfEe5I7AsGB6upLme25LdsjWPsejGekp8uAIA2HXguWywosG	2024-09-20 13:03:26.756922	2024-09-20 13:03:26.756922
\.


--
-- Data for Name: patient_records; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.patient_records (id, facility_id, patient_name, record, updated_at, created_at) FROM stdin;
2	1	John Frost	{"iv":"56f2343e96bfc85ea5d68f70f517e573","encryptedData":"be8a73032c5742157cf2995883f92ff0b08fb995dfebe9f4aa898555dc9c2cc8dd8b27a8dc9e99910f3f490b12b89a17281b2d70e3413bbb8b3d15ed4b01a9d6451909ade9"}	2024-09-20 14:05:46.164192	2024-09-20 14:05:46.164192
3	1	Elsa Iceheart	{"iv":"b4ce5f4416a56143c3eb50b39cb3b1f5","encryptedData":"0c567472ea85492901affec2444c849b877ccc6d044cae0daa161bafaf99e4ae4ef9fd59b02118ec0be8c3c30bdefacbd13587c0d0634d4f1f1ca4244e8e9060a89c9c86ed077482081616a4a654766a85"}	2024-09-20 14:05:46.189427	2024-09-20 14:05:46.189427
5	2	Anna Freeze	{"iv":"c05c7f1f9e1cdc3e4a30d228550232b4","encryptedData":"3e0568bf12067e2d3165c2eea6e67b81071aa60a7f4a1904691f0e70b84432df81539b089196640cd7f35017469cafbf9cf184e158b31c5cd772540df6e777e1f8ece6ae497ebfe1b399c334663685"}	2024-09-20 14:05:46.249883	2024-09-20 14:05:46.249883
6	2	Jack Snow	{"iv":"1500f7dd050d2de7560d49c09aa4e18c","encryptedData":"4f14fdc10b00d6c9fb21d91fe25a4f9d4ab15122b5a6d37a0e5274fb73ea8aac312a3d38dc6e78b1b3858b7a3c2d7816c44747a9ec3ccf10533a2b42a82daccf7c13b424065fa5508ba96ab362157b7e0a93"}	2024-09-20 14:05:46.273609	2024-09-20 14:05:46.273609
7	2	Sam Blizzard	{"iv":"fa93ef0938a3cca800204814e310c525","encryptedData":"6646c25ef5284253b2f29ced6343b3379d38183c7e1dac046817f74eb9a9f264f78a6e71c76751eabed1c82abd0dda7713110a214789f57ebf62b8cc1a"}	2024-09-20 14:05:46.302093	2024-09-20 14:05:46.302093
8	3	Fiona Frost	{"iv":"db47fb0baeb56786b19c0e077a118b7c","encryptedData":"7ad407469ba83a8b034f729fea47ad9373e6bf8231b60a04338136e24685fe00172eeca94c38c0db29eff296d627ca9da6ab7f4ede1e617c412bf68e138b263ea64a6f90d3526c022ae1376d"}	2024-09-20 14:05:46.332406	2024-09-20 14:05:46.332406
9	3	Olaf Winters	{"iv":"6a7b6c322e7c57d751c99dc3cbe5721c","encryptedData":"9d18b16a58a80cb9b9407ef5c827e25b045f0ccd7fe006e36c79c580b5d45c0b2bb7838f1c87ed9842e566727abfffe248702bbfcc3715255fee57dfb90a4412b390b1c19dc235ee73345d5e00603c4e6b03c8"}	2024-09-20 14:05:46.360705	2024-09-20 14:05:46.360705
10	4	Sven Ice	{"iv":"7a69b72ada88a6ca19d0eb4e2703b6ee","encryptedData":"15d90812121dfeee6be069a6639ae5156116cda304e7eb3b227878c1562e2b9abcdd5443f2e3ec40bd75bcc80bb4acd669060f4e6f3a2111375756d852e91d2176ae841166a1544193b4f42c706d"}	2024-09-20 14:05:46.393463	2024-09-20 14:05:46.393463
11	4	Kristoff Snowshoe	{"iv":"dfa6111654ec3a0261e8cd65c709f92d","encryptedData":"ff3d898bddaa09a753ba885570097f5af6b20795dd214d7f77986b102775e72e6afa4566eb758b6cc31cc886d3beefd63aa1f961aba166ba8e7b0a09782136506da7076bbe488e16beddf9a8"}	2024-09-20 14:05:46.430807	2024-09-20 14:05:46.430807
12	5	Luna Polar	{"iv":"4d70fd1a98bf932d9138a79d2337b210","encryptedData":"b44f7ad1557535e67153badb7dccf73cf68be5c7cf368314d448396d233919d1aef98f774c1ec5021355a4c9cb16586373b79eac7d13d143eb23f2c2f661e21fcef8401241610daf40c9c227166c181d"}	2024-09-20 14:05:46.486377	2024-09-20 14:05:46.486377
13	5	Aurora Borealis	{"iv":"e3ea8102b7eb9a8b2bbdc8c7ac3bbfa5","encryptedData":"af57f0504f9d44fe67f37f73e197fb6c12f3ce7ed3a274667431cb4f8c83270a2c9bc8e114192322acc20156d8f4a40f53a709cc706e6a386df343825e69957384f163bbea4983e607"}	2024-09-20 14:05:46.549	2024-09-20 14:05:46.549
14	5	Henry Glacier	{"iv":"77782c5a1abacbd57aab5792ba659b75","encryptedData":"05f18d6cee4bb16fb8df978dd1e3478efde328e777fab10965e56ec1e3d1d9f6e830926b7c2d8ad2637cc7424d747d37f2ef878df717fbefc7e1494549b2b86ace5bbda0e3cc1eff4dea"}	2024-09-20 14:05:46.587327	2024-09-20 14:05:46.587327
15	6	Chill McGee	{"iv":"cc35f21cd0880e2cb061c8194c805390","encryptedData":"e9c42efd2462827f7edc8c738f63d5574b8c5d420079ad6505a28bdc8676b47a4e7958e6aa879e55fb1d81a22d78df5e9c8aedfef93e6b599eb2367591d7cb37968dbc79d03fc44d1ab91be55ab40dac83efcb9af4a8c647e7eda3bc19f000fde69cb235911fe71483bffcd7169aa3"}	2024-09-20 14:05:46.614479	2024-09-20 14:05:46.614479
16	6	Glacier Yeti	{"iv":"9d73478b3bbbc0110588d6525c662028","encryptedData":"15dfcea97e0c9ce44ec8ff2c9c6e86b5e9989d639c16e8e9ca4b70f6ad260b6c3bd8e7539a1bbbe4ec381bd01f8b066ec6bcf73221fc3abf4b12565634862fb30ffd2445a89590457fd2643d1cdc4a7e75eb108dc9a287eaaf5b8ebb"}	2024-09-20 14:05:46.645274	2024-09-20 14:05:46.645274
17	6	Icy Winds	{"iv":"350489af9573685836340a44578960a7","encryptedData":"fdad0b656881884202061595786738c3b4f214e06d2ea78e23a6f4bd6b0f31a1d3271e85403eacecfaec7d5bbf379983390c4fa60ea12e62926cf36d3264c141fe7bed35b78c6a5141c0893b5b4a"}	2024-09-20 14:05:46.677871	2024-09-20 14:05:46.677871
18	7	Arctic Gale	{"iv":"db58870c75fea40861a90fd86b489e01","encryptedData":"0fec9af915f784d6aedf75283e4292c97b16eb469910da8e49a39ca5316bb5aed08447db986de7c2183d28243848dc6e037bdcbdf78a5e894fa97f7cc9c39cdc05620496ab5691d429d322e2"}	2024-09-20 14:05:46.703841	2024-09-20 14:05:46.703841
19	7	Blizzard Snowfall	{"iv":"8f0314d64b8462fa18e90656e85095e3","encryptedData":"01bda1a240180ef3168d5216e25c43343da94b7f6062942116a5295d944ca5f52a1ecd3dfe605eedd0cb9ced75f8893bc2c48b12f0f9c45be4e2492e8cdd639047f8255c53d0ba0c82e171cd77ad9c5223d4fba4"}	2024-09-20 14:05:46.736292	2024-09-20 14:05:46.736292
20	8	Frostina Snowflake	{"iv":"d54abc9a2d4706d679e2487337422417","encryptedData":"7aedbbef06df11a5a32853eec54bca1acb8a2ab38bfc035d0cf30ba9a7566fb45c3886ee3ee9cb54de1b143b0de02a47cfa9009987b146ff1dbc8f2f180a218968a792a9369083f9a2508d0012e9"}	2024-09-20 14:05:46.766297	2024-09-20 14:05:46.766297
21	8	Iceberg Skipper	{"iv":"1fcc6ecb6d2b2f82d5dfb80814a07cce","encryptedData":"d855b1c96f24dbe6a02269f2f114ab931e752a3d1c29ea33dc8c09761e819a50c85bdea6302b5ea01018bf4e34b1f34e1ae143dbf79361a1d5a8f4b9367af1293ba22c64c73a8bca23dead04f9e1b55480db21c71e2603c3aab7b88bfbd95af9d25323345f83155dbfe5861a"}	2024-09-20 14:05:46.793828	2024-09-20 14:05:46.793828
22	8	North Wind	{"iv":"e373605a0685d53883ddf242c02abf50","encryptedData":"8307883bd99eec4fc51fd1516530c0fd85eb2bcec35e79cf53bd710ad5df9654b177f3e07d279ec38960f8fa96c58ca8695b168b0e8e829a7e43a2c9edef33f7df6a642c119dda412b"}	2024-09-20 14:05:46.821501	2024-09-20 14:05:46.821501
23	9	Snowdrift Glider	{"iv":"f8e2de2f2343f1d7fae7148ba75745a3","encryptedData":"d09542dbb660b98dac2ed1cfe7ce93c7d85943b064b76abef499663111185a95993df59069d67e894eb73188a5edb812875e50842c054328a54fd9bf53b62bcb5b1e41f0318d48e702b6a376d8bb1b2f1c2b38e0537fb5b2cc70d535"}	2024-09-20 14:05:46.845325	2024-09-20 14:05:46.845325
24	9	Tundra Whisper	{"iv":"e98a6072e50600b45e6d354dc820532a","encryptedData":"693d8318c27db05d856adc557e2e2ba09b1b5e1686acd81d7e3bda4aec8357db687625a6be25e3175910a0ec3488a56b933a020806ebdcb0eac0f4b6dd8ef89c78b2d39c017a5856a30d0f8ac17da89fb7c9f2f9e4d82da3f60e"}	2024-09-20 14:05:46.868374	2024-09-20 14:05:46.868374
25	10	Igloo Stone	{"iv":"56c3b54d1bb55f32fde6f868368bb6ef","encryptedData":"3fcdf642227e366c0d35632a5533ace9894c37f4c0466f7184e1a3f361dc69778bbc993daf0e7417606f9c11c70ef357b2c6ca3bee35e7b123499d69d4390639d0b189c1adeca2bfbee3401e518f2f0097be4b5536ce7e1ccafa4019c5000c0a0703b4b2378696"}	2024-09-20 14:05:46.896898	2024-09-20 14:05:46.896898
26	10	Polar Bear	{"iv":"b5d8eb4b145ad84effc35fa2d9b5133b","encryptedData":"2d668feeae4b345751a7ce04f0534605a5c8b3eba41a8b7fc787136179cd546bca5b0e7c7f5a47f2de81e50219ff48d0f5429e973999d06515a1da547fea365ab48e7e06c70fa737ccbf59d1e962db3b"}	2024-09-20 14:05:46.918681	2024-09-20 14:05:46.918681
27	10	Snowstorm Howl	{"iv":"f89ec18da25d7c61dbee94757cba4ed9","encryptedData":"305ebb17a63aeb7d2f9f069aabf299f2d1dd8ec3745889966337cbfa111496b7dbbc9354884bf6a22c23d66ab4634fa52916cb2cc7c6321440bcde05fd1903f6893935b73da5d21553b277c986"}	2024-09-20 14:05:46.947474	2024-09-20 14:05:46.947474
\.


--
-- Data for Name: supplies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.supplies (id, name, updated_at, created_at) FROM stdin;
1	Marshmallows	2024-09-20 13:03:11.234215	2024-09-20 13:03:11.234215
2	Needles (Extra Large)	2024-09-20 13:03:11.234215	2024-09-20 13:03:11.234215
3	Hot Cocoa Mix	2024-09-20 13:03:11.234215	2024-09-20 13:03:11.234215
4	Thermal Blankets	2024-09-20 13:03:11.234215	2024-09-20 13:03:11.234215
5	Snow Boots	2024-09-20 13:03:11.234215	2024-09-20 13:03:11.234215
6	Igloo Repair Kit	2024-09-20 13:03:11.234215	2024-09-20 13:03:11.234215
7	Arctic Survival Guide	2024-09-20 13:03:11.234215	2024-09-20 13:03:11.234215
8	Emergency Snow Shovels	2024-09-20 13:03:11.234215	2024-09-20 13:03:11.234215
9	Yeti Repellent Spray	2024-09-20 13:03:11.234215	2024-09-20 13:03:11.234215
10	Polar Bear Friendly Food	2024-09-20 13:03:11.234215	2024-09-20 13:03:11.234215
11	Frostbite Cream	2024-09-20 13:03:11.234215	2024-09-20 13:03:11.234215
12	Snow Goggles	2024-09-20 13:03:11.234215	2024-09-20 13:03:11.234215
13	Reindeer Food	2024-09-20 13:03:11.234215	2024-09-20 13:03:11.234215
14	Ice Fishing Gear	2024-09-20 13:03:11.234215	2024-09-20 13:03:11.234215
15	Snowmobile Fuel	2024-09-20 13:03:11.234215	2024-09-20 13:03:11.234215
\.


--
-- Data for Name: supplies_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.supplies_history (id, nurse_supply_id, type, quantity, delivery_date, updated_at, created_at) FROM stdin;
1	1	restock	10	\N	2024-09-20 13:36:22.963835	2024-09-20 13:36:22.963835
2	2	restock	5	2024-10-02 00:00:00	2024-09-20 13:36:22.963835	2024-09-20 13:36:22.963835
3	3	restock	7	\N	2024-09-20 13:36:22.963835	2024-09-20 13:36:22.963835
\.


--
-- Name: facilities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.facilities_id_seq', 10, true);


--
-- Name: locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locations_id_seq', 3, true);


--
-- Name: nurse_supplies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nurse_supplies_id_seq', 3, true);


--
-- Name: nurses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nurses_id_seq', 4, true);


--
-- Name: patient_records_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.patient_records_id_seq', 27, true);


--
-- Name: supplies_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.supplies_history_id_seq', 3, true);


--
-- Name: supplies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.supplies_id_seq', 15, true);


--
-- Name: facilities facilities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facilities
    ADD CONSTRAINT facilities_pkey PRIMARY KEY (id);


--
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- Name: nurse_supplies nurse_supplies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nurse_supplies
    ADD CONSTRAINT nurse_supplies_pkey PRIMARY KEY (id);


--
-- Name: nurses nurses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nurses
    ADD CONSTRAINT nurses_pkey PRIMARY KEY (id);


--
-- Name: nurses nurses_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nurses
    ADD CONSTRAINT nurses_username_key UNIQUE (username);


--
-- Name: patient_records patient_records_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient_records
    ADD CONSTRAINT patient_records_pkey PRIMARY KEY (id);


--
-- Name: supplies_history supplies_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.supplies_history
    ADD CONSTRAINT supplies_history_pkey PRIMARY KEY (id);


--
-- Name: supplies supplies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.supplies
    ADD CONSTRAINT supplies_pkey PRIMARY KEY (id);


--
-- Name: locations unique_nurse_location; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT unique_nurse_location UNIQUE (nurse_id);


--
-- Name: locations locations_nurse_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_nurse_id_fkey FOREIGN KEY (nurse_id) REFERENCES public.nurses(id) ON DELETE CASCADE;


--
-- Name: nurse_supplies nurse_supplies_nurse_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nurse_supplies
    ADD CONSTRAINT nurse_supplies_nurse_id_fkey FOREIGN KEY (nurse_id) REFERENCES public.nurses(id) ON DELETE CASCADE;


--
-- Name: nurse_supplies nurse_supplies_supply_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nurse_supplies
    ADD CONSTRAINT nurse_supplies_supply_id_fkey FOREIGN KEY (supply_id) REFERENCES public.supplies(id) ON DELETE CASCADE;


--
-- Name: patient_records patient_records_facility_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient_records
    ADD CONSTRAINT patient_records_facility_id_fkey FOREIGN KEY (facility_id) REFERENCES public.facilities(id) ON DELETE SET NULL;


--
-- Name: supplies_history supplies_history_nurse_supply_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.supplies_history
    ADD CONSTRAINT supplies_history_nurse_supply_id_fkey FOREIGN KEY (nurse_supply_id) REFERENCES public.nurse_supplies(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

