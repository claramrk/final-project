--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Homebrew)
-- Dumped by pg_dump version 15.4 (Homebrew)

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
-- Name: final_project_user; Type: SCHEMA; Schema: -; Owner: final_project_user
--

CREATE SCHEMA final_project_user;


ALTER SCHEMA final_project_user OWNER TO final_project_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: countries; Type: TABLE; Schema: final_project_user; Owner: final_project_user
--

CREATE TABLE final_project_user.countries (
    id character varying(100) NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE final_project_user.countries OWNER TO final_project_user;

--
-- Name: matches; Type: TABLE; Schema: final_project_user; Owner: final_project_user
--

CREATE TABLE final_project_user.matches (
    id integer NOT NULL,
    mentee_user_id integer NOT NULL,
    mentor_user_id integer NOT NULL,
    message_to_mentor character varying(255) NOT NULL,
    response_from_mentor character varying(255),
    termination_response character varying(255),
    status_date timestamp without time zone NOT NULL,
    status_internal character varying(255) NOT NULL
);


ALTER TABLE final_project_user.matches OWNER TO final_project_user;

--
-- Name: matches_id_seq; Type: SEQUENCE; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE final_project_user.matches ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME final_project_user.matches_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: mentee_university_applications; Type: TABLE; Schema: final_project_user; Owner: final_project_user
--

CREATE TABLE final_project_user.mentee_university_applications (
    id integer NOT NULL,
    user_id integer NOT NULL,
    studylevel integer NOT NULL,
    first_university_id integer NOT NULL,
    first_subject_id integer NOT NULL,
    second_university_id integer NOT NULL,
    second_subject_id integer NOT NULL,
    third_university_id integer NOT NULL,
    third_subject_id integer NOT NULL,
    best_mentor_matches integer[]
);


ALTER TABLE final_project_user.mentee_university_applications OWNER TO final_project_user;

--
-- Name: mentee_university_applications_id_seq; Type: SEQUENCE; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE final_project_user.mentee_university_applications ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME final_project_user.mentee_university_applications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: mentor_university_backgrounds; Type: TABLE; Schema: final_project_user; Owner: final_project_user
--

CREATE TABLE final_project_user.mentor_university_backgrounds (
    id integer NOT NULL,
    user_id integer NOT NULL,
    studylevel integer NOT NULL,
    attendance_type integer NOT NULL,
    university_id integer NOT NULL,
    subject_id integer NOT NULL
);


ALTER TABLE final_project_user.mentor_university_backgrounds OWNER TO final_project_user;

--
-- Name: mentor_university_backgrounds_id_seq; Type: SEQUENCE; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE final_project_user.mentor_university_backgrounds ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME final_project_user.mentor_university_backgrounds_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: migrations; Type: TABLE; Schema: final_project_user; Owner: final_project_user
--

CREATE TABLE final_project_user.migrations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp without time zone NOT NULL
);


ALTER TABLE final_project_user.migrations OWNER TO final_project_user;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: final_project_user; Owner: final_project_user
--

CREATE SEQUENCE final_project_user.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE final_project_user.migrations_id_seq OWNER TO final_project_user;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: final_project_user; Owner: final_project_user
--

ALTER SEQUENCE final_project_user.migrations_id_seq OWNED BY final_project_user.migrations.id;


--
-- Name: roles; Type: TABLE; Schema: final_project_user; Owner: final_project_user
--

CREATE TABLE final_project_user.roles (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    type character varying(255) NOT NULL
);


ALTER TABLE final_project_user.roles OWNER TO final_project_user;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE final_project_user.roles ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME final_project_user.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: sessions; Type: TABLE; Schema: final_project_user; Owner: final_project_user
--

CREATE TABLE final_project_user.sessions (
    id integer NOT NULL,
    token character varying(150) NOT NULL,
    expiry_timestamp timestamp without time zone DEFAULT (now() + '24:00:00'::interval) NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE final_project_user.sessions OWNER TO final_project_user;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE final_project_user.sessions ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME final_project_user.sessions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: subjects; Type: TABLE; Schema: final_project_user; Owner: final_project_user
--

CREATE TABLE final_project_user.subjects (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    discipline character varying(255) NOT NULL
);


ALTER TABLE final_project_user.subjects OWNER TO final_project_user;

--
-- Name: subjects_id_seq; Type: SEQUENCE; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE final_project_user.subjects ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME final_project_user.subjects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: universities; Type: TABLE; Schema: final_project_user; Owner: final_project_user
--

CREATE TABLE final_project_user.universities (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    country_id character varying(255) NOT NULL,
    abbreviation character varying(30) NOT NULL
);


ALTER TABLE final_project_user.universities OWNER TO final_project_user;

--
-- Name: universities_id_seq; Type: SEQUENCE; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE final_project_user.universities ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME final_project_user.universities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: final_project_user; Owner: final_project_user
--

CREATE TABLE final_project_user.users (
    id integer NOT NULL,
    email character varying(100) NOT NULL,
    password_hash character varying(100) NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    pronouns character varying(255),
    phone_number bigint,
    birthdate timestamp without time zone,
    country_id character varying(10),
    photo character varying(255),
    role_id integer NOT NULL,
    max_capacity integer
);


ALTER TABLE final_project_user.users OWNER TO final_project_user;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE final_project_user.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME final_project_user.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: migrations id; Type: DEFAULT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.migrations ALTER COLUMN id SET DEFAULT nextval('final_project_user.migrations_id_seq'::regclass);


--
-- Data for Name: countries; Type: TABLE DATA; Schema: final_project_user; Owner: final_project_user
--

COPY final_project_user.countries (id, name) FROM stdin;
AFG	Afghanistan
ALB	Albania
DZA	Algeria
AND	Andorra
AGO	Angola
ATG	Antigua and Barbuda
ARG	Argentina
ARM	Armenia
AUS	Australia
AUT	Austria
AZE	Azerbaijan
BHR	Bahrain
BGD	Bangladesh
BRB	Barbados
BLR	Belarus
BEL	Belgium
BLZ	Belize
BEN	Benin
BTN	Bhutan
BOL	Bolivia
BIH	Bosnia and Herzegovina
BWA	Botswana
BRA	Brazil
BRN	Brunei
BGR	Bulgaria
BFA	Burkina Faso
BDI	Burundi
CPV	Cabo Verde
KHM	Cambodia
CMR	Cameroon
CAN	Canada
CAF	Central African Republic
TCD	Chad
CHL	Chile
CHN	China
COL	Colombia
COM	Comoros
COD	Democratic Republic of Congo
COG	Republic of the Congo
CRI	Costa Rica
CIV	Côte d’Ivoire
HRV	Croatia
CUB	Cuba
CYP	Cyprus
CZE	Czech Republic
DNK	Denmark
DJI	Djibouti
DMA	Dominica
DOM	Dominican Republic
TLS	East Timor (Timor-Leste)
ECU	Ecuador
EGY	Egypt
SLV	El Salvador
GNQ	Equatorial Guinea
ERI	Eritrea
EST	Estonia
SWZ	Eswatini
ETH	Ethiopia
FJI	Fiji
FIN	Finland
FRA	France
GAB	Gabon
GEO	Georgia
DEU	Germany
GHA	Ghana
GRC	Greece
GRD	Grenada
GTM	Guatemala
GIN	Guinea
GNB	Guinea-Bissau
GUY	Guyana
HTI	Haiti
HND	Honduras
HUN	Hungary
ISL	Iceland
IND	India
IDN	Indonesia
IRN	Iran
IRQ	Iraq
IRL	Ireland
ISR	Israel
ITA	Italy
JAM	Jamaica
JPN	Japan
JOR	Jordan
KAZ	Kazakhstan
KEN	Kenya
KIR	Kiribati
PRK	North Korea
KOR	South Korea
UNK	Kosovo
KWT	Kuwait
KGZ	Kyrgyzstan
LAO	Laos
LVA	Latvia
LBN	Lebanon
LSO	Lesotho
LBR	Liberia
LBY	Libya
LIE	Liechtenstein
LTU	Lithuania
LUX	Luxembourg
MDG	Madagascar
MWI	Malawi
MYS	Malaysia
MDV	Maldives
MLI	Mali
MLT	Malta
MHL	Marshall Islands
MRT	Mauritania
MUS	Mauritius
MEX	Mexico
FSM	Federated States of Micronesia
MDA	Moldova
MCO	Monaco
MNG	Mongolia
MNE	Montenegro
MAR	Morocco
MOZ	Mozambique
MMR	Myanmar (Burma)
NAM	Namibia
NRU	Nauru
NPL	Nepal
NLD	Netherlands
NZL	New Zealand
NIC	Nicaragua
NER	Niger
NGA	Nigeria
MKD	North Macedonia
NOR	Norway
OMN	Oman
PAK	Pakistan
PLW	Palau
PAN	Panama
PNG	Papua New Guinea
PRY	Paraguay
PER	Peru
PHL	Philippines
POL	Poland
PRT	Portugal
QAT	Qatar
ROU	Romania
RUS	Russia
RWA	Rwanda
KNA	Saint Kitts and Nevis
LCA	Saint Lucia
VCT	Saint Vincent and the Grenadines
WSM	Samoa
SMR	San Marino
STP	Sao Tome and Principe
SAU	Saudi Arabia
SEN	Senegal
SRB	Serbia
SYC	Seychelles
SLE	Sierra Leone
SGP	Singapore
SVK	Slovakia
SVN	Slovenia
SLB	Solomon Islands
SOM	Somalia
ZAF	South Africa
ESP	Spain
LKA	Sri Lanka
SDN	Sudan
SSD	South Sudan
SUR	Suriname
SWE	Sweden
CHE	Switzerland
SYR	Syria
TWN	Taiwan
TJK	Tajikistan
TZA	Tanzania
THA	Thailand
BHS	The Bahamas
GMB	The Gambia
TGO	Togo
TON	Tonga
TTO	Trinidad and Tobago
TUN	Tunisia
TUR	Turkey
TKM	Turkmenistan
TUV	Tuvalu
UGA	Uganda
UKR	Ukraine
ARE	United Arab Emirates
GBR	United Kingdom
USA	United States
URY	Uruguay
UZB	Uzbekistan
VUT	Vanuatu
VAT	Vatican City
VEN	Venezuela
VNM	Vietnam
YEM	Yemen
ZMB	Zambia
ZWE	Zimbabwe
\.


--
-- Data for Name: matches; Type: TABLE DATA; Schema: final_project_user; Owner: final_project_user
--

COPY final_project_user.matches (id, mentee_user_id, mentor_user_id, message_to_mentor, response_from_mentor, termination_response, status_date, status_internal) FROM stdin;
3	60	6	FVxaIEDtE7Uit7rktJzJj6SkofhSKz	\N	\N	2023-11-20 17:20:19.68	mentee requested mentor
7	64	1	DhrAEZPJ1KszWJQOM0HueNzNc3Ym7O	\N	\N	2023-11-20 17:23:39.02	mentee requested mentor
4	61	7	jJJWTBFDZkZu668x7OjHV9oLCVmXNu	excited!	\N	2023-11-21 15:26:31.76	mentor accepted match
5	62	7	1qUVdTbmNIDu3APIRQScwwmjRGvarV		\N	2023-11-21 15:55:53.94	mentor rejected match
9	14	7	Hallo	hiii!	xyz	2023-11-21 16:09:39.83	mentorship ended
1	58	5	8YtMokvVQtcODpgRDh1dsnosRbIBPi	ijqijwqqiwqinq	\N	2023-11-21 16:24:15.16	mentor accepted match
2	59	5	M0HmQj4rdULqefIbk9Ol9DoBiLDb1n	qwoqnidoqknw	\N	2023-11-21 16:24:47.21	mentor accepted match
6	63	9	rDpUG5TNjsuB9aFTNEPXMIw8COn3Az	xyz	yyz	2023-11-21 17:09:17.76	mentorship ended
8	65	9	please!	xyz	xyz	2023-11-21 17:10:55.48	mentorship ended
11	67	8	Because you are amazing! 	yay	xyz	2023-11-21 17:24:52.54	mentorship ended
12	67	2	xyz	\N	\N	2023-11-22 14:29:28.14	mentee requested mentor
10	66	3	6VAz75r013yUp54QeyxfW2RKKWZyL6	xyz	\N	2023-11-22 14:39:16.03	mentor accepted match
13	71	2	xqjowp	\N	\N	2023-11-22 19:26:48.64	mentee requested mentor
\.


--
-- Data for Name: mentee_university_applications; Type: TABLE DATA; Schema: final_project_user; Owner: final_project_user
--

COPY final_project_user.mentee_university_applications (id, user_id, studylevel, first_university_id, first_subject_id, second_university_id, second_subject_id, third_university_id, third_subject_id, best_mentor_matches) FROM stdin;
1	10	1	19	36	8	79	13	25	\N
2	11	1	11	61	9	76	6	51	\N
3	12	2	5	53	7	66	14	35	\N
4	13	2	20	64	2	63	28	68	\N
5	14	3	8	25	23	12	30	54	\N
6	15	3	16	79	1	55	17	57	\N
7	16	1	21	8	18	3	10	59	\N
8	17	2	22	48	31	69	26	41	\N
9	18	3	2	50	4	9	27	20	\N
10	19	1	32	67	12	29	24	34	\N
11	35	1	4	21	3	12	14	64	\N
12	36	1	21	45	26	55	18	30	\N
13	39	1	5	48	31	20	6	42	\N
14	42	1	19	67	1	64	15	26	\N
15	44	1	31	87	2	27	12	63	\N
16	45	1	4	39	15	19	21	17	\N
17	46	1	1	81	23	82	23	57	\N
18	47	1	10	47	9	64	32	34	\N
19	48	3	3	7	3	5	2	5	\N
20	49	1	5	4	13	84	6	52	\N
21	50	1	21	76	7	86	25	38	\N
22	51	1	15	51	10	7	25	44	\N
23	53	1	32	1	13	69	20	32	\N
24	54	1	17	28	18	5	19	14	\N
25	55	1	6	36	4	53	1	76	\N
26	56	1	5	29	25	85	11	61	\N
27	57	1	21	35	21	8	12	9	\N
28	58	1	22	90	32	25	11	82	\N
29	59	1	7	68	25	13	6	66	\N
30	60	1	28	44	10	15	14	60	\N
31	61	1	30	68	14	69	13	20	\N
32	62	1	12	12	31	42	21	28	\N
33	63	1	31	25	14	43	29	44	\N
34	64	1	16	45	9	39	1	29	\N
35	65	2	3	16	11	8	14	3	\N
36	66	1	7	16	13	27	2	7	\N
37	67	2	1	9	3	5	5	5	\N
38	71	1	3	4	5	5	8	2	\N
\.


--
-- Data for Name: mentor_university_backgrounds; Type: TABLE DATA; Schema: final_project_user; Owner: final_project_user
--

COPY final_project_user.mentor_university_backgrounds (id, user_id, studylevel, attendance_type, university_id, subject_id) FROM stdin;
1	1	2	3	16	75
2	2	3	1	6	57
3	3	1	3	13	15
4	4	1	2	21	38
5	5	2	1	18	82
6	6	3	1	10	30
7	7	2	2	30	45
8	8	1	3	23	70
9	9	2	2	14	3
10	1	3	2	2	47
11	2	1	3	17	36
12	3	3	1	28	85
13	4	2	2	7	31
14	5	1	3	25	89
15	6	2	1	8	51
16	7	3	1	33	71
17	8	2	2	26	79
18	9	1	3	24	41
19	1	1	2	27	34
20	2	3	3	11	65
21	3	1	1	3	61
22	4	3	1	4	21
23	5	2	2	19	63
24	6	1	3	12	46
25	7	1	1	31	67
26	8	2	3	15	64
27	9	3	2	9	4
28	1	2	1	22	32
29	2	1	3	5	5
30	3	3	1	1	78
31	68	2	2	3	6
32	68	3	1	12	14
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: final_project_user; Owner: final_project_user
--

COPY final_project_user.migrations (id, name, created_at) FROM stdin;
731	00000-createTableCountries.ts	2023-11-20 13:24:07.67777
732	00001-insertCountries.ts	2023-11-20 13:24:07.67777
733	00002-createTableSubjects.ts	2023-11-20 13:24:07.67777
734	00003-insertSubjects.ts	2023-11-20 13:24:07.67777
735	00004-createTableUniversities.ts	2023-11-20 13:24:07.67777
736	00005-insertUniversities.ts	2023-11-20 13:24:07.67777
737	00006-createTableRoles.ts	2023-11-20 13:24:07.67777
738	00007-insertRoles.ts	2023-11-20 13:24:07.67777
739	00008-createTableUsers.ts	2023-11-20 13:24:07.67777
740	00009-insertMockMentors.ts	2023-11-20 13:24:07.67777
741	00010-insertMockMentees.ts	2023-11-20 13:24:07.67777
742	00011-createTableMentorUniversityBackgrounds.ts	2023-11-20 13:24:07.67777
743	00012-insertMockMentorUniversityBackgrounds.ts	2023-11-20 13:24:07.67777
744	00013-createTableMenteeUniversityApplications.ts	2023-11-20 13:24:07.67777
745	00014-insertMockMenteeUniversityApplications.ts	2023-11-20 13:24:07.67777
746	00015-createTableMatches.ts	2023-11-20 13:24:07.67777
747	00016-createTableSessions.ts	2023-11-20 13:24:07.67777
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: final_project_user; Owner: final_project_user
--

COPY final_project_user.roles (id, name, type) FROM stdin;
1	incomplete mentor	mentor
2	complete mentor	mentor
3	approved mentor	mentor
4	incomplete mentee	mentee
5	complete mentee	mentee
6	approved mentee	mentee
7	teammember	teammember
8	admin	admin
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: final_project_user; Owner: final_project_user
--

COPY final_project_user.sessions (id, token, expiry_timestamp, user_id) FROM stdin;
58	+FVf8OKhLCI2VW7q3AisCE7yVx2M9AKOWM8Zi1STOlOzKYVbNeT4/WDBNQWZP4RNKFPUDfjTmTX8LgK1egtnMyt3PTtN/gKi53neB4T84qbHCMTSZHkifUj0rfDHNCk3pTWSKQ==	2023-11-23 18:32:53.504925	71
59	nFDpYRskUafs8/egkKeK9NuIxd7qVLqM3jhaelgW5QnjvFppe6ZeBkvNks7ZhwYzUbyBOu7qo8kOdLMQ+Tmyp50YNq9pXYdVBCa6bLxVqs7NiCcEddkZEhyoa8cACNA53YyJKg==	2023-11-23 19:29:39.482848	2
\.


--
-- Data for Name: subjects; Type: TABLE DATA; Schema: final_project_user; Owner: final_project_user
--

COPY final_project_user.subjects (id, name, discipline) FROM stdin;
1	Architecture	Architecture & Design
2	Commercial Architecture	Architecture & Design
3	Environmental Design/Green Architecture	Architecture & Design
4	Industrial Architecture	Architecture & Design
5	Interior Design/Architecture	Architecture & Design
6	Residential Architecture	Architecture & Design
7	Urban Design/Planning	Architecture & Design
8	(Comparative) Literature/English/Modern Languages	Arts & Humanities
9	(Digital) Humanities	Arts & Humanities
10	Archaeology	Arts & Humanities
11	Classical Studies/Classics	Arts & Humanities
12	Cultural Studies/Medieval Studies	Arts & Humanities
13	Ethics	Arts & Humanities
14	History	Arts & Humanities
15	Journalism	Arts & Humanities
16	Liberal Arts	Arts & Humanities
17	Linguistics	Arts & Humanities
18	Media Studies	Arts & Humanities
19	Music	Arts & Humanities
20	Philosophy	Arts & Humanities
21	Religion	Arts & Humanities
22	Theatre & Performance/Fine Arts/Film Studies	Arts & Humanities
23	(Strategic) Entrepreneurship & Innovation	Business & Economics
24	Accounting	Business & Economics
25	Economics	Business & Economics
26	Finance/Banking/Financial Management	Business & Economics
27	Financial Policy & Regulation	Business & Economics
28	Human Resource Management & Organizational Analysis	Business & Economics
29	Management (incl. Business, ESG, Executive or International Management)	Business & Economics
30	Marketing (incl. Digital, Strategic, International Marketing)	Business & Economics
31	Dental Public Health	Dentistry, Oral & Craniofacial Science
32	Dental Therapy & Hygiene	Dentistry, Oral & Craniofacial Science
33	Dentistry (incl. Advanced Minimum Intervention Restorative, Aesthetic, Endodontics, Maxillofacial & Craniofacial Technology, Pediatric Dentistry, Periodontology, Regenerative Dentistry)	Dentistry, Oral & Craniofacial Science
34	Tissue Engineering & Innovation Technology	Dentistry, Oral & Craniofacial Science
35	Aerospace Engineering	Engineering Sciences
36	Biomedical Engineering	Engineering Sciences
37	Chemical Engineering	Engineering Sciences
38	Civil Engineering	Engineering Sciences
39	Electronic Engineering	Engineering Sciences
40	General Engineering	Engineering Sciences
41	Industrial Engineering	Engineering Sciences
42	Mechanical Engineering	Engineering Sciences
43	Nuclear Engineering	Engineering Sciences
44	Software Engineering	Engineering Sciences
45	(International) Corporate/Financial/Commercial/Tax Law	Law
46	(Transnational) Legal Studies	Law
47	Law (incl. American, English, French, German, Hong Kong, Australasian, European Union, Spanish Law, etc.)	Law
48	(Clinical) Pharmacology/Pharmacy	Life Sciences & Medicine
49	Anatomy, Development & Human Biology	Life Sciences & Medicine
50	Biochemistry	Life Sciences & Medicine
51	Biomedical Sciences	Life Sciences & Medicine
52	Drug Development Science	Life Sciences & Medicine
53	Forensic Science	Life Sciences & Medicine
54	Healthcare Technologies/MedTech Innovation & Entrepreneurship	Life Sciences & Medicine
55	Medical Affairs/Physiology	Life Sciences & Medicine
56	Medicine	Life Sciences & Medicine
57	Nutritional Science	Life Sciences & Medicine
58	Physiotherapy	Life Sciences & Medicine
59	Sport & Exercise Medical Sciences	Life Sciences & Medicine
60	Biology	Natural & Mathematical Sciences
61	Chemistry (incl. with Biomedicine)	Natural & Mathematical Sciences
62	Computational Finance	Natural & Mathematical Sciences
63	Computer Science/(Advanced) Cybersecurity/Informatics	Natural & Mathematical Sciences
64	Data Science	Natural & Mathematical Sciences
65	Mathematics (incl. Financial Mathematics)	Natural & Mathematical Sciences
66	Physics (incl. Theoretical Physics, Astrophysics and Cosmology, Biophysics)	Natural & Mathematical Sciences
67	Robotics/Artificial Intelligence	Natural & Mathematical Sciences
68	Statistics	Natural & Mathematical Sciences
69	Clinical Nursing	Nursing, Midwifery & Palliative Care
70	Midwifery	Nursing, Midwifery & Palliative Care
71	Nursing	Nursing, Midwifery & Palliative Care
72	Palliative Care	Nursing, Midwifery & Palliative Care
73	Addictions/(International) Addiction Studies	Psychiatry, Psychology & Neuroscience
74	Affective Disorders	Psychiatry, Psychology & Neuroscience
75	Applied Statistical Modelling & Health Informatics	Psychiatry, Psychology & Neuroscience
76	Clinical Neurodevelopmental Sciences	Psychiatry, Psychology & Neuroscience
77	Mental Health Studies (incl. Global Mental Health, Forensic Mental Health, Child & Adolescent Mental Health)	Psychiatry, Psychology & Neuroscience
78	Neuroscience	Psychiatry, Psychology & Neuroscience
79	Psychiatry (incl. Social Genetic & Developmental Psychiatry, Psychiatric Research, Organizational Psychiatry, Clinical Neuropsychiatry)	Psychiatry, Psychology & Neuroscience
80	Psychology (incl. Clinical Psychology)	Psychiatry, Psychology & Neuroscience
81	(International) Political Economy/Global Economy	Social Science & Public Policy
82	Cyber Policy & Strategy	Social Science & Public Policy
83	Education (incl. in Arts & Cultural Settings, Education Management, STEM Education, TESOL, Applied Linguistics and English Language Teaching)	Social Science & Public Policy
84	Environmental Science/Climate Change/Sustainability/Sustainable Cities/Urban Planning	Social Science & Public Policy
85	European & International Studies/International Affairs/International Relations/Global Affairs/Global Studies	Social Science & Public Policy
86	Geography	Social Science & Public Policy
87	International Development	Social Science & Public Policy
88	Politics (incl. European Politics)	Social Science & Public Policy
89	Politics, Philosophy and Economics (PPE)	Social Science & Public Policy
90	Public Policy/Public Administration	Social Science & Public Policy
91	Regional Studies (e.g., Asian Studies, Middle Eastern Studies, Slavic Studies, Chinese Studies, German Studies, American Studies, etc.)	Social Science & Public Policy
92	Social Sciences	Social Science & Public Policy
93	Terror Security & Society/War Studies/Risk Analysis, Disasters and Resilience/Intelligence & International Security/Conflict Studies/Peace Studies	Social Science & Public Policy
\.


--
-- Data for Name: universities; Type: TABLE DATA; Schema: final_project_user; Owner: final_project_user
--

COPY final_project_user.universities (id, name, country_id, abbreviation) FROM stdin;
1	University of Edinburgh	GBR	Edinburgh
2	Trinity College Dublin	IRL	Trinity
3	University of Oxford	GBR	Oxford
4	Harvard University	USA	Harvard
5	Sciences Po	FRA	Sciences Po
6	Brown University	USA	Brown
7	Columbia University	USA	Columbia
8	Cornell University	USA	Cornell
9	Dartmouth College	USA	Dartmouth
10	ETH Zurich	CHE	ETH
11	Imperial College London	GBR	UCL
12	Johns Hopkins University	USA	JHU
13	Princeton University	USA	Princeton
14	Stanford University	USA	Stanford
15	University College London	GBR	UCL
16	University of California, Berkeley	USA	UC Berkeley
17	University of Cambridge	GBR	Cambridge
18	University of St. Andrews	GBR	St. Andrews
19	University of Warwick	GBR	Warwick
20	Yale University	USA	Yale
21	Bocconi University	ITA	Bocconi
22	University of Durham	GBR	Durham
23	California Institute of Technology	USA	CalTech
24	Copenhagen Business School	DNK	CBS
25	Hong Kong University	CHN	HKU
26	King’s College London	GBR	KCL
27	London School of Economics and Political Science	GBR	LSE
28	Massachusetts Institute of Technology	USA	MIT
29	National University of Singapore	SGP	NUS
30	New York University	USA	NYU
31	University of Amsterdam	NLD	UvA
32	University of California, Los Angeles	USA	UCLA
33	University of Pennsylvania	USA	UPenn
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: final_project_user; Owner: final_project_user
--

COPY final_project_user.users (id, email, password_hash, firstname, lastname, pronouns, phone_number, birthdate, country_id, photo, role_id, max_capacity) FROM stdin;
1	john.doe@example.com	$2a$12$17sUmtbee4W6wcIWWM0nnemcnWKes3JhfATzWbKpyo6idc1QwSR62	John	Doe	he/him/his	1234567890	1990-01-15 00:00:00	USA	https://res.cloudinary.com/dqmhbukkm/image/upload/v1699885976/of8nti8lmn87ockbx0nk.png	3	5
2	alice.smith@example.com	$2a$12$17sUmtbee4W6wcIWWM0nnemcnWKes3JhfATzWbKpyo6idc1QwSR62	Alice	Smith	she/her/hers	9876543210	1985-04-20 00:00:00	CAN	https://res.cloudinary.com/dqmhbukkm/image/upload/v1699885974/wvhiakvc9ukwlxl7kzg1.png	3	8
3	megan.johnson@example.com	$2a$12$17sUmtbee4W6wcIWWM0nnemcnWKes3JhfATzWbKpyo6idc1QwSR62	Megan	Johnson	they/them/theirs	5551234567	1998-07-10 00:00:00	GBR	https://res.cloudinary.com/dqmhbukkm/image/upload/v1699885968/p7yso8olwvoklrjagn5t.png	3	6
4	david.brown@example.com	$2a$12$17sUmtbee4W6wcIWWM0nnemcnWKes3JhfATzWbKpyo6idc1QwSR62	David	Brown	he/him/his	1112223333	1992-12-05 00:00:00	AUS	https://res.cloudinary.com/dqmhbukkm/image/upload/v1699885974/fgukgthstj7ceifqjj1h.png	3	7
5	linda.wilson@example.com	$2a$12$17sUmtbee4W6wcIWWM0nnemcnWKes3JhfATzWbKpyo6idc1QwSR62	Linda	Wilson	she/her/hers	9990001111	1989-09-12 00:00:00	FRA	https://res.cloudinary.com/dqmhbukkm/image/upload/v1699885967/uzzcmnf56svdxnjpebwu.png	3	5
6	william.jones@example.com	$2a$12$17sUmtbee4W6wcIWWM0nnemcnWKes3JhfATzWbKpyo6idc1QwSR62	William	Jones	he/him/his	1234567890	1985-04-20 00:00:00	CAN	https://res.cloudinary.com/dqmhbukkm/image/upload/v1699885969/b0toqwebyqnzfbmxfi88.png	3	8
7	emily.davis@example.com	$2a$12$17sUmtbee4W6wcIWWM0nnemcnWKes3JhfATzWbKpyo6idc1QwSR62	Emily	Davis	she/her/hers	9876543210	1998-07-10 00:00:00	GBR	https://res.cloudinary.com/dqmhbukkm/image/upload/v1699886343/ubyymdkchh8qn1hgkhim.png	3	6
8	james.wilson@example.com	$2a$12$17sUmtbee4W6wcIWWM0nnemcnWKes3JhfATzWbKpyo6idc1QwSR62	James	Wilson	he/him/his	1112223333	1992-12-05 00:00:00	AUS	https://res.cloudinary.com/dqmhbukkm/image/upload/v1699885969/walrhh1zb0xukku54jk9.png	3	7
9	sarah.miller@example.com	$2a$12$17sUmtbee4W6wcIWWM0nnemcnWKes3JhfATzWbKpyo6idc1QwSR62	Sarah	Miller	she/her/hers	9990001111	1989-09-12 00:00:00	FRA	https://res.cloudinary.com/dqmhbukkm/image/upload/v1699886343/fbvuw80xjhb60is8ayfr.png	3	5
10	jane.smith@example.com	$2a$12$yfqArnER5V0BXGg54IbVR.qY.Sh1BziwUvcCO7cEVj/L0vrifQWlS	Jane	Smith	she/her/hers	1112233444	1995-08-10 00:00:00	DEU	\N	6	\N
11	robert.johnson@example.com	$2a$12$yfqArnER5V0BXGg54IbVR.qY.Sh1BziwUvcCO7cEVj/L0vrifQWlS	Robert	Johnson	he/him/his	5556781234	1990-05-17 00:00:00	GBR	\N	6	\N
12	susan.williams@example.com	$2a$12$yfqArnER5V0BXGg54IbVR.qY.Sh1BziwUvcCO7cEVj/L0vrifQWlS	Susan	Williams	she/her/hers	9876654321	1987-12-30 00:00:00	FRA	\N	6	\N
13	michael.davis@example.com	$2a$12$yfqArnER5V0BXGg54IbVR.qY.Sh1BziwUvcCO7cEVj/L0vrifQWlS	Michael	Davis	he/him/his	3332221111	1982-09-25 00:00:00	ESP	\N	6	\N
14	laura.martin@example.com	$2a$12$yfqArnER5V0BXGg54IbVR.qY.Sh1BziwUvcCO7cEVj/L0vrifQWlS	Laura	Martin	she/her/hers	5558887777	1993-03-08 00:00:00	ITA	\N	6	\N
15	steven.jones@example.com	$2a$12$yfqArnER5V0BXGg54IbVR.qY.Sh1BziwUvcCO7cEVj/L0vrifQWlS	Steven	Jones	he/him/his	4445556666	1998-01-12 00:00:00	CAN	\N	6	\N
16	emily.anderson@example.com	$2a$12$yfqArnER5V0BXGg54IbVR.qY.Sh1BziwUvcCO7cEVj/L0vrifQWlS	Emily	Anderson	she/her/hers	7773339999	1991-11-02 00:00:00	USA	\N	6	\N
17	thomas.miller@example.com	$2a$12$yfqArnER5V0BXGg54IbVR.qY.Sh1BziwUvcCO7cEVj/L0vrifQWlS	Thomas	Miller	he/him/his	8889994444	1986-06-22 00:00:00	AUS	\N	6	\N
18	mary.harris@example.com	$2a$12$yfqArnER5V0BXGg54IbVR.qY.Sh1BziwUvcCO7cEVj/L0vrifQWlS	Mary	Harris	she/her/hers	1119998888	1984-04-14 00:00:00	DEU	\N	6	\N
19	joseph.wilson@example.com	$2a$12$yfqArnER5V0BXGg54IbVR.qY.Sh1BziwUvcCO7cEVj/L0vrifQWlS	Joseph	Wilson	he/him/his	9998887777	1999-05-29 00:00:00	FRA	\N	6	\N
20	clarqpjpi@example.com	$2b$12$wgo3KRHls/cqhy6Og7FCfO67BUDWW6o/.ZKahrsu56OHLBUeDooQe	\N	\N	\N	\N	\N	\N	\N	1	\N
21	wndewiuo@example.com	$2b$12$CCpHpGT1s3kbPo1owtrjvuzVuCEIkx5j6XF69HHPiI7sWXVQ/KRXC	\N	\N	\N	\N	\N	\N	\N	4	\N
22	iejdpo@fjopoc.com	$2b$12$fPXkwgE19wlWKBCe1SU/VeTf4F8fGsfPY1vmp4Ya3Uyd/d1xAaHm6	\N	\N	\N	\N	\N	\N	\N	4	\N
24	qepemqdopc@skdn.com	$2b$12$1I6qonPSdLEIXFcyEYWhAee8Oj2ByqsFg5BciXGQBJayQQ9678JUi	\N	\N	\N	\N	\N	\N	\N	4	\N
25	ksdnfd@dinfp.com	$2b$12$XIyn9olNeReS2.lrt81eCeuok2Y/p/Dljm9ZU/IrRyS0wpqbO6Exy	\N	\N	\N	\N	\N	\N	\N	4	\N
26	playwright@example.com	$2b$12$48GO6XPgNxQNJCT6t3vjsek2VAS0IYinQ3SMcmZw5QAyXHHqP.nUG	\N	\N	\N	\N	\N	\N	\N	4	\N
27	lp6ux@example.com	$2b$12$vfEEe20.8LiBqpp58ieZ3eVuTp/YpSzXZWx5Ul0kaj2ufuL0PQ.ya	\N	\N	\N	\N	\N	\N	\N	4	\N
28	cdcv9@example.com	$2b$12$OfjmrT2Kp0X1bmrefEplmOJDcVYd7AmEiiUMNFAMkXYyhJETTJ0bG	\N	\N	\N	\N	\N	\N	\N	4	\N
29	4h0tg@example.com	$2b$12$ix6xwM0O9wdhpE54W5hwIO0r7/vkccE0RMZdjhl40UxAyzhDPc5mm	\N	\N	\N	\N	\N	\N	\N	4	\N
30	icmba@example.com	$2b$12$cmE2RrgRe7Npz.Svizd7tOspNZyLBE4EJ1pywB7pBxWSGBEOE4OVy	\N	\N	\N	\N	\N	\N	\N	4	\N
31	loa1a@example.com	$2b$12$1xZ9Dg3zaYMkPGgNkWQgX.FyWZVE7IhR.0iULFOlYI/Ulca/EWojG	\N	\N	\N	\N	\N	\N	\N	4	\N
36	lsej9@example.com	$2b$12$KaoNvKRsPiID.nBNyZZqVuV.i053ZlUOvZBa.TieQimErCy7QRnx6	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	6	\N
32	0ciao@example.com	$2b$12$M7iGa70ADVqdcS3BRJ4C3OpPBR/lu0C9c3gyceMXkp.EfQWO6zI5C	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	5	\N
35	f3zrq@example.com	$2b$12$Ds.35R9WuCN/LToTbp5b0eZQJ5EWB/zeFKT1G2JRTdX.N2SGTGliu	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	5	\N
33	ny062@example.com	$2b$12$RdKraz5q5DoNQVxXPZYI8u9Ry1JyEGrmocq6.yoaVcvN0WgxuT9su	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	5	\N
34	49x43@example.com	$2b$12$AFmjj2u9c6HEon1IczkC3e0kyDcKeWvUY544VS0ViMimtLHtGia72	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	5	\N
38	ql2rk@example.com	$2b$12$pLpsz/pxY5DL16nhzj6rweeckMQwkOM8/xlWDZ7tq.h36G402wGMC	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	5	\N
37	6md4x@example.com	$2b$12$yjgwGjGW/w8gIP/aX/UMr.jkny0QtcZ75YDM/2Wu5Ik5xKvUFxcO6	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	5	\N
39	y7yrj@example.com	$2b$12$l1ErERePs3Z3WD6UteOiAuT5Otn0usPV1zJc9K7famx.XUSnzL3G.	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	6	\N
40	ixjpd@example.com	$2b$12$pFsR4IkRkjoDVhLHuS4Za.nN.n/5SWj2S2W665uEO5Q8Q1YuIsavy	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	5	\N
41	xb6ep@example.com	$2b$12$0cMgWrbM/FbPWqB9c6ADJ.E1p5bKKWsWK/brNdz1PhLaLQvvb9vsq	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	5	\N
42	jeszg@example.com	$2b$12$SEqUKQlB3OnBzDqGffz1uurAMFtWy3THe70iBwQAnH3CAkptZtROa	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	6	\N
43	cpjlx@example.com	$2b$12$9BcFqz/51cTx8CM3A2g09.ccNMnheu2xwHjAr9rmoG8/8kKyD/N3u	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	5	\N
53	l4ufi@example.com	$2b$12$si5URwfHxpeS6fnLcs9eBO061Ap7fdmpfmhIK0/b8v5DDvki.6wVu	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	6	\N
44	dczfc@example.com	$2b$12$JtWUmAMvUmNybLjol0pTduj3AfX4T0vjeUED0kKs9Zr7fM3VCG3aG	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	6	\N
45	jkn5m@example.com	$2b$12$/15LaTh0gAWn9D4fXcvt3e98G.6GWh.7nFyk.wSfNk0icVWtWH1ki	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	6	\N
54	runkz@example.com	$2b$12$LbPRbL5YOPyMkUm9he2N9uEX4dtJ6bIUhZtCwkUmy8.wpiR.2krca	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	6	\N
46	ft567@example.com	$2b$12$CYG81ymHmKq5J0oMFZY9Uu.qyhogbkzIeRUrxazhQ98FBQNa.gFhm	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	6	\N
60	tqcrz@example.com	$2b$12$75bPPfjEBO1UamqsEioll.Bben6d6/uX//C3saROCVIKV3yWnFu9C	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	6	\N
47	aj4dr@example.com	$2b$12$BGb7RAxBcSluM45MRcsfHO8c6odLlCjFcx5QWgroQqAYnBElKbjdm	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	6	\N
68	iowefnmeik@ando.com	$2b$12$B2ws/rUFmQ5Syxied1xyIewblyfTyIWY7UlPi5eZrw.NjniHRJb6K	Arald	jenqin	she/her/hers	130919023	2023-07-04 00:00:00	AGO	https://res.cloudinary.com/dqmhbukkm/image/upload/v1700660433/zdb0lwmwue6hrpy9zngf.png	3	3
55	fb1ub@example.com	$2b$12$U3HCa/bxRdNyoKdJALj.qesXa6Y3tqXtvI/ilwlLMj/1zgQe65kG6	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	6	\N
48	inri@example.com	$2b$12$rF.HNc/5BCwu5plHu/gdy.6PA.ApDDJcArB4DE.hNo.ZbsGT1/W2O	eendio	poejp2o	they/them/theirs	398897	2023-07-20 00:00:00	DZA	\N	6	\N
65	iqoneio@example.com	$2b$12$zK7wQxDDn7yZLXnhfd.fwehtFicHcnY0.fGln77UOhWUQTIsh94VS	Tina	wenoin	she/her/hers	918192	2023-08-01 00:00:00	ATG	https://res.cloudinary.com/dqmhbukkm/image/upload/v1700559707/dj1anhnirmkvm1tu4cka.png	6	\N
61	e1ult@example.com	$2b$12$PScZ9NHpcMVB7pXShEKJ3eRQDhykVOd2XespjM7OqMuXvXiKtpNtK	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	6	\N
49	inevv@example.com	$2b$12$evzlIHbJvf/uBZMiSyY1T.L6jKN4PEOwSZGqdSB64e2R30CRoA0V6	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	6	\N
56	ihm3q@example.com	$2b$12$J.hFklZXpO5sYh2A23ohkeIkPf/KaSA94XnRMvv2/weVDWwGVV6jy	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	6	\N
50	aeaty@example.com	$2b$12$jf2he826TyKklL35tPP.Vuy0KkAa0vBVqEZ/2g938XV1Oj5P53vGa	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	6	\N
57	neerg@example.com	$2b$12$mq4HJqPaiXeletswvL4G7u7djhWYx4KaxcwEg7/NY///5w64z.5Xq	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	6	\N
51	nmcwt@example.com	$2b$12$PFkUQUZUEryCh9CDlQoxw.i1ZO6nNLJGO5f32ZIBtZQ4gRbGGsU5S	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	6	\N
52	yqquj@example.com	$2b$12$6DpT0WmsXwPDZ.fWyqz7puvZIF.QUHaJX8p7GhU.vypgCztWRRAAO	\N	\N	\N	\N	\N	\N	\N	4	\N
69	opeqkjdpoeq@aionio.com	$2b$12$LPxogtO0CLaG/ksasL5uH.3wuwA1PhX5AcetSn3Gr.Iy7XuDEbOIa	ijsioj	iowjqioj	she/her/hers	93281	2023-08-14 00:00:00	ARG	https://res.cloudinary.com/dqmhbukkm/image/upload/v1700664549/gmgfact5dfdhwth8i31b.png	2	\N
62	5ace7@example.com	$2b$12$UTWYcbU.Qxw60BJuaMJlm.xPny7AmisSi4EzMJYgwPx7RZIcVHQPq	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	6	\N
66	j26rc@example.com	$2b$12$8xaNIcbFg.sAIoDkMrySx.EMWLcIlEch.EcNKagA5ODGpDFZXtiWm	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	6	\N
58	fvj3s@example.com	$2b$12$peO6iEfrNqI7hnisE/Jp6uYsvwSrxvO/c/AexERt8i86d7bcN5e8S	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	6	\N
70	iajdopwq@jandik.com	$2b$12$gyVqMBacxhYK.cXl.LTemeZODHHYALXmTezZbnwRNCmw/xxuftUue	\N	\N	\N	\N	\N	\N	\N	4	\N
63	c4ka9@example.com	$2b$12$tABBzeMCWgL2tNM5YuE0OudeIlk8nGdJtR8kGpnP1d5pcDaMrDE3O	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	6	\N
59	piugx@example.com	$2b$12$shHl10v0XvPXQk/lhhj1xecicKuYxjqWkz2TmKOp/OO/3K5nggV8O	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	6	\N
67	qeiodnqoi@fnwoi.com	$2b$12$.6M0zwNxP/fosNOgFG5KcOLAC9kxul11v/fN2wgAICzuqh8vv8t2S	Clara	nqin	she/her/hers	93121398	2023-07-06 00:00:00	DZA	https://res.cloudinary.com/dqmhbukkm/image/upload/v1700583552/lp9ougiiohw9aiushser.png	6	\N
64	aynpg@example.com	$2b$12$MPL6kM1jZkQtwE2M6CMRJOX3MvlzwGlGIS7IlFXzSrLMoAzNZwWS6	Testfirstname	Testlastname	she/her/hers	219289182	1998-01-12 00:00:00	CAN	\N	6	\N
71	kjwwjkwbqn@jansdo.com	$2b$12$UflicotXU39BRLBFUhPlnuiPLl7KC2W7Td16OZQ3ccl3Z22ME3Idi	woi	hip	he/him/his	198210	2023-11-08 00:00:00	AND	\N	6	\N
\.


--
-- Name: matches_id_seq; Type: SEQUENCE SET; Schema: final_project_user; Owner: final_project_user
--

SELECT pg_catalog.setval('final_project_user.matches_id_seq', 13, true);


--
-- Name: mentee_university_applications_id_seq; Type: SEQUENCE SET; Schema: final_project_user; Owner: final_project_user
--

SELECT pg_catalog.setval('final_project_user.mentee_university_applications_id_seq', 38, true);


--
-- Name: mentor_university_backgrounds_id_seq; Type: SEQUENCE SET; Schema: final_project_user; Owner: final_project_user
--

SELECT pg_catalog.setval('final_project_user.mentor_university_backgrounds_id_seq', 32, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: final_project_user; Owner: final_project_user
--

SELECT pg_catalog.setval('final_project_user.migrations_id_seq', 747, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: final_project_user; Owner: final_project_user
--

SELECT pg_catalog.setval('final_project_user.roles_id_seq', 8, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: final_project_user; Owner: final_project_user
--

SELECT pg_catalog.setval('final_project_user.sessions_id_seq', 59, true);


--
-- Name: subjects_id_seq; Type: SEQUENCE SET; Schema: final_project_user; Owner: final_project_user
--

SELECT pg_catalog.setval('final_project_user.subjects_id_seq', 93, true);


--
-- Name: universities_id_seq; Type: SEQUENCE SET; Schema: final_project_user; Owner: final_project_user
--

SELECT pg_catalog.setval('final_project_user.universities_id_seq', 33, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: final_project_user; Owner: final_project_user
--

SELECT pg_catalog.setval('final_project_user.users_id_seq', 71, true);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- Name: matches matches_pkey; Type: CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.matches
    ADD CONSTRAINT matches_pkey PRIMARY KEY (id);


--
-- Name: mentee_university_applications mentee_university_applications_pkey; Type: CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.mentee_university_applications
    ADD CONSTRAINT mentee_university_applications_pkey PRIMARY KEY (id);


--
-- Name: mentor_university_backgrounds mentor_university_backgrounds_pkey; Type: CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.mentor_university_backgrounds
    ADD CONSTRAINT mentor_university_backgrounds_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: subjects subjects_pkey; Type: CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.subjects
    ADD CONSTRAINT subjects_pkey PRIMARY KEY (id);


--
-- Name: universities universities_pkey; Type: CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.universities
    ADD CONSTRAINT universities_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: matches matches_mentee_user_id_fkey; Type: FK CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.matches
    ADD CONSTRAINT matches_mentee_user_id_fkey FOREIGN KEY (mentee_user_id) REFERENCES final_project_user.users(id) ON DELETE CASCADE;


--
-- Name: matches matches_mentor_user_id_fkey; Type: FK CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.matches
    ADD CONSTRAINT matches_mentor_user_id_fkey FOREIGN KEY (mentor_user_id) REFERENCES final_project_user.users(id) ON DELETE CASCADE;


--
-- Name: mentee_university_applications mentee_university_applications_first_subject_id_fkey; Type: FK CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.mentee_university_applications
    ADD CONSTRAINT mentee_university_applications_first_subject_id_fkey FOREIGN KEY (first_subject_id) REFERENCES final_project_user.subjects(id) ON DELETE CASCADE;


--
-- Name: mentee_university_applications mentee_university_applications_first_university_id_fkey; Type: FK CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.mentee_university_applications
    ADD CONSTRAINT mentee_university_applications_first_university_id_fkey FOREIGN KEY (first_university_id) REFERENCES final_project_user.universities(id) ON DELETE CASCADE;


--
-- Name: mentee_university_applications mentee_university_applications_second_subject_id_fkey; Type: FK CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.mentee_university_applications
    ADD CONSTRAINT mentee_university_applications_second_subject_id_fkey FOREIGN KEY (second_subject_id) REFERENCES final_project_user.subjects(id) ON DELETE CASCADE;


--
-- Name: mentee_university_applications mentee_university_applications_second_university_id_fkey; Type: FK CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.mentee_university_applications
    ADD CONSTRAINT mentee_university_applications_second_university_id_fkey FOREIGN KEY (second_university_id) REFERENCES final_project_user.universities(id) ON DELETE CASCADE;


--
-- Name: mentee_university_applications mentee_university_applications_third_subject_id_fkey; Type: FK CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.mentee_university_applications
    ADD CONSTRAINT mentee_university_applications_third_subject_id_fkey FOREIGN KEY (third_subject_id) REFERENCES final_project_user.subjects(id) ON DELETE CASCADE;


--
-- Name: mentee_university_applications mentee_university_applications_third_university_id_fkey; Type: FK CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.mentee_university_applications
    ADD CONSTRAINT mentee_university_applications_third_university_id_fkey FOREIGN KEY (third_university_id) REFERENCES final_project_user.universities(id) ON DELETE CASCADE;


--
-- Name: mentee_university_applications mentee_university_applications_user_id_fkey; Type: FK CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.mentee_university_applications
    ADD CONSTRAINT mentee_university_applications_user_id_fkey FOREIGN KEY (user_id) REFERENCES final_project_user.users(id);


--
-- Name: mentor_university_backgrounds mentor_university_backgrounds_subject_id_fkey; Type: FK CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.mentor_university_backgrounds
    ADD CONSTRAINT mentor_university_backgrounds_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES final_project_user.subjects(id) ON DELETE CASCADE;


--
-- Name: mentor_university_backgrounds mentor_university_backgrounds_university_id_fkey; Type: FK CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.mentor_university_backgrounds
    ADD CONSTRAINT mentor_university_backgrounds_university_id_fkey FOREIGN KEY (university_id) REFERENCES final_project_user.universities(id) ON DELETE CASCADE;


--
-- Name: mentor_university_backgrounds mentor_university_backgrounds_user_id_fkey; Type: FK CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.mentor_university_backgrounds
    ADD CONSTRAINT mentor_university_backgrounds_user_id_fkey FOREIGN KEY (user_id) REFERENCES final_project_user.users(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES final_project_user.users(id) ON DELETE CASCADE;


--
-- Name: universities universities_country_id_fkey; Type: FK CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.universities
    ADD CONSTRAINT universities_country_id_fkey FOREIGN KEY (country_id) REFERENCES final_project_user.countries(id) ON DELETE CASCADE;


--
-- Name: users users_country_id_fkey; Type: FK CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.users
    ADD CONSTRAINT users_country_id_fkey FOREIGN KEY (country_id) REFERENCES final_project_user.countries(id) ON DELETE CASCADE;


--
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: final_project_user; Owner: final_project_user
--

ALTER TABLE ONLY final_project_user.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES final_project_user.roles(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

