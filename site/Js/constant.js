/*  J-ICE library 

    based on:
 *
 * Copyright (C) 2010-2014 Pieremanuele Canepa http://j-ice.sourceforge.net/
 *
 * Contact: pierocanepa@sourceforge.net
 *
 *  This library is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU Lesser General Public
 *  License as published by the Free Software Foundation; either
 *  version 2.1 of the License, or (at your option) any later version.
 *
 *  This library is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public
 *  License along with this library; if not, write to the Free Software
 *  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA
 *  02111-1307  USA.
 */


var version = "3.0.0"; // BH 2018

var eleSymb = [];
eleSymb[0] = "select";
eleSymb[1] = "H";
eleSymb[2] = "He";
eleSymb[3] = "Li";
eleSymb[4] = "Be";
eleSymb[5] = "B";
eleSymb[6] = "C";
eleSymb[7] = "N";
eleSymb[8] = "O";
eleSymb[9] = "F";
eleSymb[10] = "Ne";
eleSymb[11] = "Na";
eleSymb[12] = "Mg";
eleSymb[13] = "Al";
eleSymb[14] = "Si";
eleSymb[15] = "P";
eleSymb[16] = "S";
eleSymb[17] = "Cl";
eleSymb[18] = "Ar";
eleSymb[19] = "K";
eleSymb[20] = "Ca";
eleSymb[21] = "Sc";
eleSymb[22] = "Ti";
eleSymb[23] = "V";
eleSymb[24] = "Cr";
eleSymb[25] = "Mn";
eleSymb[26] = "Fe";
eleSymb[27] = "Co";
eleSymb[28] = "Ni";
eleSymb[29] = "Cu";
eleSymb[30] = "Zn";
eleSymb[31] = "Ga";
eleSymb[32] = "Ge";
eleSymb[33] = "As";
eleSymb[34] = "Se";
eleSymb[35] = "Br";
eleSymb[36] = "No";
eleSymb[37] = "Rb";
eleSymb[38] = "Sr";
eleSymb[39] = "Y";
eleSymb[40] = "Zr";
eleSymb[41] = "Nb";
eleSymb[42] = "Mo";
eleSymb[43] = "Tc";
eleSymb[44] = "Ru";
eleSymb[45] = "Rh";
eleSymb[46] = "Pd";
eleSymb[47] = "Ag";
eleSymb[48] = "Cd";
eleSymb[49] = "In";
eleSymb[50] = "Sn";
eleSymb[51] = "Sb";
eleSymb[52] = "Te";
eleSymb[53] = "I";
eleSymb[54] = "Xe";
eleSymb[55] = "Cs";
eleSymb[56] = "Ba";
eleSymb[57] = "La";
eleSymb[58] = "Ce";
eleSymb[59] = "Lr";
eleSymb[60] = "Md";
eleSymb[61] = "Pr";
eleSymb[62] = "Sm";
eleSymb[63] = "Eu";
eleSymb[64] = "Gd";
eleSymb[65] = "Tb";
eleSymb[66] = "Dy";
eleSymb[67] = "Ho";
eleSymb[68] = "Er";
eleSymb[69] = "Tm";
eleSymb[70] = "Yb";
eleSymb[71] = "Lu";
eleSymb[72] = "Hf";
eleSymb[73] = "Ta";
eleSymb[74] = "W";
eleSymb[75] = "Re";
eleSymb[76] = "Os";
eleSymb[77] = "Ir";
eleSymb[78] = "Pt";
eleSymb[79] = "Au";
eleSymb[80] = "Hg";
eleSymb[81] = "Tl";
eleSymb[82] = "Pb";
eleSymb[83] = "Bi";
eleSymb[84] = "Po";
eleSymb[85] = "At";
eleSymb[86] = "Rd";
eleSymb[87] = "Fr";
eleSymb[88] = "Rn";
eleSymb[89] = "Ac";
eleSymb[90] = "Th";
eleSymb[91] = "Pa";
eleSymb[92] = "Sg";
eleSymb[93] = "Np";
eleSymb[94] = "Pu";
eleSymb[95] = "Am";
eleSymb[96] = "Cm";
eleSymb[97] = "Bk";
eleSymb[98] = "Cf";
eleSymb[99] = "Es";

////Arrays elements : 594
var spaceGroupName = new Array("select", "1, P1", "2, P-1", "3:b, P121",
		"3:b, P2", "3:c, P112", "3:a, P211", "4:b, P1211", "4:b, P21",
		"4:b*, P1211*", "4:c, P1121", "4:c*, P1121*", "4:a, P2111",
		"4:a*, P2111*", "5:b1, C121", "5:b1, C2", "5:b2, A121", "5:b3, I121",
		"5:c1, A112", "5:c2, B112", "5:c3, I112", "5:a1, B211", "5:a2, C211",
		"5:a3, I211", "6:b, P1m1", "6:b, Pm", "6:c, P11m", "6:a, Pm11",
		"7:b1, P1c1", "7:b1, Pc", "7:b2, P1n1", "7:b2, Pn", "7:b3, P1a1",
		"7:b3, Pa", "7:c1, P11a", "7:c2, P11n", "7:c3, P11b", "7:a1, Pb11",
		"7:a2, Pn11", "7:a3, Pc11", "8:b1, C1m1", "8:b1, Cm", "8:b2, A1m1",
		"8:b3, I1m1", "8:b3, Im", "8:c1, A11m", "8:c2, B11m", "8:c3, I11m",
		"8:a1, Bm11", "8:a2, Cm11", "8:a3, Im11", "9:b1, C1c1", "9:b1, Cc",
		"9:b2, A1n1", "9:b3, I1a1", "9:-b1, A1a1", "9:-b2, C1n1",
		"9:-b3, I1c1", "9:c1, A11a", "9:c2, B11n", "9:c3, I11b", "9:-c1, B11b",
		"9:-c2, A11n", "9:-c3, I11a", "9:a1, Bb11", "9:a2, Cn11", "9:a3, Ic11",
		"9:-a1, Cc11", "9:-a2, Bn11", "9:-a3, Ib11", "10:b, P12/m1",
		"10:b, P2/m", "10:c, P112/m", "10:a, P2/m11", "11:b, P121/m1",
		"11:b, P21/m", "11:b*, P121/m1*", "11:c, P1121/m", "11:c*, P1121/m*",
		"11:a, P21/m11", "11:a*, P21/m11*", "12:b1, C12/m1", "12:b1, C2/m",
		"12:b2, A12/m1", "12:b3, I12/m1", "12:b3, I2/m", "12:c1, A112/m",
		"12:c2, B112/m", "12:c3, I112/m", "12:a1, B2/m11", "12:a2, C2/m11",
		"12:a3, I2/m11", "13:b1, P12/c1", "13:b1, P2/c", "13:b2, P12/n1",
		"13:b2, P2/n", "13:b3, P12/a1", "13:b3, P2/a", "13:c1, P112/a",
		"13:c2, P112/n", "13:c3, P112/b", "13:a1, P2/b11", "13:a2, P2/n11",
		"13:a3, P2/c11", "14:b1, P121/c1", "14:b1, P21/c", "14:b2, P121/n1",
		"14:b2, P21/n", "14:b3, P121/a1", "14:b3, P21/a", "14:c1, P1121/a",
		"14:c2, P1121/n", "14:c3, P1121/b", "14:a1, P21/b11", "14:a2, P21/n11",
		"14:a3, P21/c11", "15:b1, C12/c1", "15:b1, C2/c", "15:b2, A12/n1",
		"15:b3, I12/a1", "15:b3, I2/a", "15:-b1, A12/a1", "15:-b2, C12/n1",
		"15:-b2, C2/n", "15:-b3, I12/c1", "15:-b3, I2/c", "15:c1, A112/a",
		"15:c2, B112/n", "15:c3, I112/b", "15:-c1, B112/b", "15:-c2, A112/n",
		"15:-c3, I112/a", "15:a1, B2/b11", "15:a2, C2/n11", "15:a3, I2/c11",
		"15:-a1, C2/c11", "15:-a2, B2/n11", "15:-a3, I2/b11", "16, P222",
		"17, P2221", "17*, P2221*", "17:cab, P2122", "17:bca, P2212",
		"18, P21212", "18:cab, P22121", "18:bca, P21221", "19, P212121",
		"20, C2221", "20*, C2221*", "20:cab, A2122", "20:cab*, A2122*",
		"20:bca, B2212", "21, C222", "21:cab, A222", "21:bca, B222",
		"22, F222", "23, I222", "24, I212121", "25, Pmm2", "25:cab, P2mm",
		"25:bca, Pm2m", "26, Pmc21", "26*, Pmc21*", "26:ba-c, Pcm21",
		"26:ba-c*, Pcm21*", "26:cab, P21ma", "26:-cba, P21am", "26:bca, Pb21m",
		"26:a-cb, Pm21b", "27, Pcc2", "27:cab, P2aa", "27:bca, Pb2b",
		"28, Pma2", "28*, Pma2*", "28:ba-c, Pbm2", "28:cab, P2mb",
		"28:-cba, P2cm", "28:-cba*, P2cm*", "28:bca, Pc2m", "28:a-cb, Pm2a",
		"29, Pca21", "29:ba-c, Pbc21", "29:cab, P21ab", "29:-cba, P21ca",
		"29:bca, Pc21b", "29:a-cb, Pb21a", "30, Pnc2", "30:ba-c, Pcn2",
		"30:cab, P2na", "30:-cba, P2an", "30:bca, Pb2n", "30:a-cb, Pn2b",
		"31, Pmn21", "31:ba-c, Pnm21", "31:cab, P21mn", "31:-cba, P21nm",
		"31:bca, Pn21m", "31:a-cb, Pm21n", "32, Pba2", "32:cab, P2cb",
		"32:bca, Pc2a", "33, Pna21", "33*, Pna21*", "33:ba-c, Pbn21",
		"33:ba-c*, Pbn21*", "33:cab, P21nb", "33:cab*, P21nb*",
		"33:-cba, P21cn", "33:-cba*, P21cn*", "33:bca, Pc21n",
		"33:a-cb, Pn21a", "34, Pnn2", "34:cab, P2nn", "34:bca, Pn2n",
		"35, Cmm2", "35:cab, A2mm", "35:bca, Bm2m", "36, Cmc21", "36*, Cmc21*",
		"36:ba-c, Ccm21", "36:ba-c*, Ccm21*", "36:cab, A21ma",
		"36:cab*, A21ma*", "36:-cba, A21am", "36:-cba*, A21am*",
		"36:bca, Bb21m", "36:a-cb, Bm21b", "37, Ccc2", "37:cab, A2aa",
		"37:bca, Bb2b", "38, Amm2", "38:ba-c, Bmm2", "38:cab, B2mm",
		"38:-cba, C2mm", "38:bca, Cm2m", "38:a-cb, Am2m", "39, Abm2",
		"39:ba-c, Bma2", "39:cab, B2cm", "39:-cba, C2mb", "39:bca, Cm2a",
		"39:a-cb, Ac2m", "40, Ama2", "40:ba-c, Bbm2", "40:cab, B2mb",
		"40:-cba, C2cm", "40:bca, Cc2m", "40:a-cb, Am2a", "41, Aba2",
		"41:ba-c, Bba2", "41:cab, B2cb", "41:-cba, C2cb", "41:bca, Cc2a",
		"41:a-cb, Ac2a", "42, Fmm2", "42:cab, F2mm", "42:bca, Fm2m",
		"43, Fdd2", "43:cab, F2dd", "43:bca, Fd2d", "44, Imm2", "44:cab, I2mm",
		"44:bca, Im2m", "45, Iba2", "45:cab, I2cb", "45:bca, Ic2a", "46, Ima2",
		"46:ba-c, Ibm2", "46:cab, I2mb", "46:-cba, I2cm", "46:bca, Ic2m",
		"46:a-cb, Im2a", "47, Pmmm", "48:01:00, Pnnn", "48:02:00, Pnnn",
		"49, Pccm", "49:cab, Pmaa", "49:bca, Pbmb", "50:01:00, Pban",
		"50:02:00, Pban", "50:1cab, Pncb", "50:2cab, Pncb", "50:1bca, Pcna",
		"50:2bca, Pcna", "51, Pmma", "51:ba-c, Pmmb", "51:cab, Pbmm",
		"51:-cba, Pcmm", "51:bca, Pmcm", "51:a-cb, Pmam", "52, Pnna",
		"52:ba-c, Pnnb", "52:cab, Pbnn", "52:-cba, Pcnn", "52:bca, Pncn",
		"52:a-cb, Pnan", "53, Pmna", "53:ba-c, Pnmb", "53:cab, Pbmn",
		"53:-cba, Pcnm", "53:bca, Pncm", "53:a-cb, Pman", "54, Pcca",
		"54:ba-c, Pccb", "54:cab, Pbaa", "54:-cba, Pcaa", "54:bca, Pbcb",
		"54:a-cb, Pbab", "55, Pbam", "55:cab, Pmcb", "55:bca, Pcma",
		"56, Pccn", "56:cab, Pnaa", "56:bca, Pbnb", "57, Pbcm",
		"57:ba-c, Pcam", "57:cab, Pmca", "57:-cba, Pmab", "57:bca, Pbma",
		"57:a-cb, Pcmb", "58, Pnnm", "58:cab, Pmnn", "58:bca, Pnmn",
		"59:01:00, Pmmn", "59:02:00, Pmmn", "59:1cab, Pnmm", "59:2cab, Pnmm",
		"59:1bca, Pmnm", "59:2bca, Pmnm", "60, Pbcn", "60:ba-c, Pcan",
		"60:cab, Pnca", "60:-cba, Pnab", "60:bca, Pbna", "60:a-cb, Pcnb",
		"61, Pbca", "61:ba-c, Pcab", "62, Pnma", "62:ba-c, Pmnb",
		"62:cab, Pbnm", "62:-cba, Pcmn", "62:bca, Pmcn", "62:a-cb, Pnam",
		"63, Cmcm", "63:ba-c, Ccmm", "63:cab, Amma", "63:-cba, Amam",
		"63:bca, Bbmm", "63:a-cb, Bmmb", "64, Cmca", "64:ba-c, Ccmb",
		"64:cab, Abma", "64:-cba, Acam", "64:bca, Bbcm", "64:a-cb, Bmab",
		"65, Cmmm", "65:cab, Ammm", "65:bca, Bmmm", "66, Cccm", "66:cab, Amaa",
		"66:bca, Bbmb", "67, Cmma", "67:ba-c, Cmmb", "67:cab, Abmm",
		"67:-cba, Acmm", "67:bca, Bmcm", "67:a-cb, Bmam", "68:01:00, Ccca",
		"68:02:00, Ccca", "68:1ba-c, Cccb", "68:2ba-c, Cccb", "68:1cab, Abaa",
		"68:2cab, Abaa", "68:1-cba, Acaa", "68:2-cba, Acaa", "68:1bca, Bbcb",
		"68:2bca, Bbcb", "68:1a-cb, Bbab", "68:2a-cb, Bbab", "69, Fmmm",
		"70:01:00, Fddd", "70:02:00, Fddd", "71, Immm", "72, Ibam",
		"72:cab, Imcb", "72:bca, Icma", "73, Ibca", "73:ba-c, Icab",
		"74, Imma", "74:ba-c, Immb", "74:cab, Ibmm", "74:-cba, Icmm",
		"74:bca, Imcm", "74:a-cb, Imam", "75, P4", "76, P41", "76*, P41*",
		"77, P42", "77*, P42*", "78, P43", "78*, P43*", "79, I4", "80, I41",
		"81, P-4", "82, I-4", "83, P4/m", "84, P42/m", "84*, P42/m*",
		"85:01:00, P4/n", "85:02:00, P4/n", "86:01:00, P42/n",
		"86:02:00, P42/n", "87, I4/m", "88:01:00, I41/a", "88:02:00, I41/a",
		"89, P422", "90, P4212", "91, P4122", "91*, P4122*", "92, P41212",
		"93, P4222", "93*, P4222*", "94, P42212", "95, P4322", "95*, P4322*",
		"96, P43212", "97, I422", "98, I4122", "99, P4mm", "100, P4bm",
		"101, P42cm", "101*, P42cm*", "102, P42nm", "103, P4cc", "104, P4nc",
		"105, P42mc", "105*, P42mc*", "106, P42bc", "106*, P42bc*",
		"107, I4mm", "108, I4cm", "109, I41md", "110, I41cd", "111, P-42m",
		"112, P-42c", "113, P-421m", "114, P-421c", "115, P-4m2", "116, P-4c2",
		"117, P-4b2", "118, P-4n2", "119, I-4m2", "120, I-4c2", "121, I-42m",
		"122, I-42d", "123, P4/mmm", "124, P4/mcc", "125:01:00, P4/nbm",
		"125:02:00, P4/nbm", "126:01:00, P4/nnc", "126:02:00, P4/nnc",
		"127, P4/mbm", "128, P4/mnc", "129:01:00, P4/nmm", "129:02:00, P4/nmm",
		"130:01:00, P4/ncc", "130:02:00, P4/ncc", "131, P42/mmc",
		"132, P42/mcm", "133:01:00, P42/nbc", "133:02:00, P42/nbc",
		"134:01:00, P42/nnm", "134:02:00, P42/nnm", "135, P42/mbc",
		"135*, P42/mbc*", "136, P42/mnm", "137:01:00, P42/nmc",
		"137:02:00, P42/nmc", "138:01:00, P42/ncm", "138:02:00, P42/ncm",
		"139, I4/mmm", "140, I4/mcm", "141:01:00, I41/amd",
		"141:02:00, I41/amd", "142:01:00, I41/acd", "142:02:00, I41/acd",
		"143, P3", "144, P31", "145, P32", "146:h, R3", "146:r, R3",
		"147, P-3", "148:h, R-3", "148:r, R-3", "149, P312", "150, P321",
		"151, P3112", "152, P3121", "153, P3212", "154, P3221", "155:h, R32",
		"155:r, R32", "156, P3m1", "157, P31m", "158, P3c1", "159, P31c",
		"160:h, R3m", "160:r, R3m", "161:h, R3c", "161:r, R3c", "162, P-31m",
		"163, P-31c", "164, P-3m1", "165, P-3c1", "166:h, R-3m", "166:r, R-3m",
		"167:h, R-3c", "167:r, R-3c", "168, P6", "169, P61", "170, P65",
		"171, P62", "172, P64", "173, P63", "173*, P63*", "174, P-6",
		"175, P6/m", "176, P63/m", "176*, P63/m*", "177, P622", "178, P6122",
		"179, P6522", "180, P6222", "181, P6422", "182, P6322", "182*, P6322*",
		"183, P6mm", "184, P6cc", "185, P63cm", "185*, P63cm*", "186, P63mc",
		"186*, P63mc*", "187, P-6m2", "188, P-6c2", "189, P-62m", "190, P-62c",
		"191, P6/mmm", "192, P6/mcc", "193, P63/mcm", "193*, P63/mcm*",
		"194, P63/mmc", "194*, P63/mmc*", "195, P23", "196, F23", "197, I23",
		"198, P213", "199, I213", "200, Pm-3", "201:01:00, Pn-3",
		"201:02:00, Pn-3", "202, Fm-3", "203:01:00, Fd-3", "203:02:00, Fd-3",
		"204, Im-3", "205, Pa-3", "206, Ia-3", "207, P432", "208, P4232",
		"209, F432", "210, F4132", "211, I432", "212, P4332", "213, P4132",
		"214, I4132", "215, P-43m", "216, F-43m", "217, I-43m", "218, P-43n",
		"219, F-43c", "220, I-43d", "221, Pm-3m", "222:01:00, Pn-3n",
		"222:02:00, Pn-3n", "223, Pm-3n", "224:01:00, Pn-3m",
		"224:02:00, Pn-3m", "225, Fm-3m", "226, Fm-3c", "227:01:00, Fd-3m",
		"227:02:00, Fd-3m", "228:01:00, Fd-3c", "228:02:00, Fd-3c",
		"229, Im-3m", "230, Ia-3d");

var spaceGroupValue = new Array("select", "1", "2", "3:b", "3:b", "3:c", "3:a",
		"4:b", "4:b", "4:b*", "4:c", "4:c*", "4:a", "4:a*", "5:b1", "5:b1",
		"5:b2", "5:b3", "5:c1", "5:c2", "5:c3", "5:a1", "5:a2", "5:a3", "6:b",
		"6:b", "6:c", "6:a", "7:b1", "7:b1", "7:b2", "7:b2", "7:b3", "7:b3",
		"7:c1", "7:c2", "7:c3", "7:a1", "7:a2", "7:a3", "8:b1", "8:b1", "8:b2",
		"8:b3", "8:b3", "8:c1", "8:c2", "8:c3", "8:a1", "8:a2", "8:a3", "9:b1",
		"9:b1", "9:b2", "9:b3", "9:-b1", "9:-b2", "9:-b3", "9:c1", "9:c2",
		"9:c3", "9:-c1", "9:-c2", "9:-c3", "9:a1", "9:a2", "9:a3", "9:-a1",
		"9:-a2", "9:-a3", "10:b", "10:b", "10:c", "10:a", "11:b", "11:b",
		"11:b*", "11:c", "11:c*", "11:a", "11:a*", "12:b1", "12:b1", "12:b2",
		"12:b3", "12:b3", "12:c1", "12:c2", "12:c3", "12:a1", "12:a2", "12:a3",
		"13:b1", "13:b1", "13:b2", "13:b2", "13:b3", "13:b3", "13:c1", "13:c2",
		"13:c3", "13:a1", "13:a2", "13:a3", "14:b1", "14:b1", "14:b2", "14:b2",
		"14:b3", "14:b3", "14:c1", "14:c2", "14:c3", "14:a1", "14:a2", "14:a3",
		"15:b1", "15:b1", "15:b2", "15:b3", "15:b3", "15:-b1", "15:-b2",
		"15:-b2", "15:-b3", "15:-b3", "15:c1", "15:c2", "15:c3", "15:-c1",
		"15:-c2", "15:-c3", "15:a1", "15:a2", "15:a3", "15:-a1", "15:-a2",
		"15:-a3", "16", "17", "17*", "17:cab", "17:bca", "18", "18:cab",
		"18:bca", "19", "20", "20*", "20:cab", "20:cab*", "20:bca", "21",
		"21:cab", "21:bca", "22", "23", "24", "25", "25:cab", "25:bca", "26",
		"26*", "26:ba-c", "26:ba-c*", "26:cab", "26:-cba", "26:bca", "26:a-cb",
		"27", "27:cab", "27:bca", "28", "28*", "28:ba-c", "28:cab", "28:-cba",
		"28:-cba*", "28:bca", "28:a-cb", "29", "29:ba-c", "29:cab", "29:-cba",
		"29:bca", "29:a-cb", "30", "30:ba-c", "30:cab", "30:-cba", "30:bca",
		"30:a-cb", "31", "31:ba-c", "31:cab", "31:-cba", "31:bca", "31:a-cb",
		"32", "32:cab", "32:bca", "33", "33*", "33:ba-c", "33:ba-c*", "33:cab",
		"33:cab*", "33:-cba", "33:-cba*", "33:bca", "33:a-cb", "34", "34:cab",
		"34:bca", "35", "35:cab", "35:bca", "36", "36*", "36:ba-c", "36:ba-c*",
		"36:cab", "36:cab*", "36:-cba", "36:-cba*", "36:bca", "36:a-cb", "37",
		"37:cab", "37:bca", "38", "38:ba-c", "38:cab", "38:-cba", "38:bca",
		"38:a-cb", "39", "39:ba-c", "39:cab", "39:-cba", "39:bca", "39:a-cb",
		"40", "40:ba-c", "40:cab", "40:-cba", "40:bca", "40:a-cb", "41",
		"41:ba-c", "41:cab", "41:-cba", "41:bca", "41:a-cb", "42", "42:cab",
		"42:bca", "43", "43:cab", "43:bca", "44", "44:cab", "44:bca", "45",
		"45:cab", "45:bca", "46", "46:ba-c", "46:cab", "46:-cba", "46:bca",
		"46:a-cb", "47", "48:01:00", "48:02:00", "49", "49:cab", "49:bca",
		"50:01:00", "50:02:00", "50:1cab", "50:2cab", "50:1bca", "50:2bca",
		"51", "51:ba-c", "51:cab", "51:-cba", "51:bca", "51:a-cb", "52",
		"52:ba-c", "52:cab", "52:-cba", "52:bca", "52:a-cb", "53", "53:ba-c",
		"53:cab", "53:-cba", "53:bca", "53:a-cb", "54", "54:ba-c", "54:cab",
		"54:-cba", "54:bca", "54:a-cb", "55", "55:cab", "55:bca", "56",
		"56:cab", "56:bca", "57", "57:ba-c", "57:cab", "57:-cba", "57:bca",
		"57:a-cb", "58", "58:cab", "58:bca", "59:01:00", "59:02:00", "59:1cab",
		"59:2cab", "59:1bca", "59:2bca", "60", "60:ba-c", "60:cab", "60:-cba",
		"60:bca", "60:a-cb", "61", "61:ba-c", "62", "62:ba-c", "62:cab",
		"62:-cba", "62:bca", "62:a-cb", "63", "63:ba-c", "63:cab", "63:-cba",
		"63:bca", "63:a-cb", "64", "64:ba-c", "64:cab", "64:-cba", "64:bca",
		"64:a-cb", "65", "65:cab", "65:bca", "66", "66:cab", "66:bca", "67",
		"67:ba-c", "67:cab", "67:-cba", "67:bca", "67:a-cb", "68:01:00",
		"68:02:00", "68:1ba-c", "68:2ba-c", "68:1cab", "68:2cab", "68:1-cba",
		"68:2-cba", "68:1bca", "68:2bca", "68:1a-cb", "68:2a-cb", "69",
		"70:01:00", "70:02:00", "71", "72", "72:cab", "72:bca", "73",
		"73:ba-c", "74", "74:ba-c", "74:cab", "74:-cba", "74:bca", "74:a-cb",
		"75", "76", "76*", "77", "77*", "78", "78*", "79", "80", "81", "82",
		"83", "84", "84*", "85:01:00", "85:02:00", "86:01:00", "86:02:00",
		"87", "88:01:00", "88:02:00", "89", "90", "91", "91*", "92", "93",
		"93*", "94", "95", "95*", "96", "97", "98", "99", "100", "101", "101*",
		"102", "103", "104", "105", "105*", "106", "106*", "107", "108", "109",
		"110", "111", "112", "113", "114", "115", "116", "117", "118", "119",
		"120", "121", "122", "123", "124", "125:01:0", "125:02:0", "126:01:0",
		"126:02:0", "127", "128", "129:01:0", "129:02:0", "130:01:0",
		"130:02:0", "131", "132", "133:01:0", "133:02:0", "134:01:0",
		"134:02:0", "135", "135*", "136", "137:01:0", "137:02:0", "138:01:0",
		"138:02:0", "139", "140", "141:01:0", "141:02:0", "142:01:0",
		"142:02:0", "143", "144", "145", "146:h", "146:r", "147", "148:h",
		"148:r", "149", "150", "151", "152", "153", "154", "155:h", "155:r",
		"156", "157", "158", "159", "160:h", "160:r", "161:h", "161:r", "162",
		"163", "164", "165", "166:h", "166:r", "167:h", "167:r", "168", "169",
		"170", "171", "172", "173", "173*", "174", "175", "176", "176*", "177",
		"178", "179", "180", "181", "182", "182*", "183", "184", "185", "185*",
		"186", "186*", "187", "188", "189", "190", "191", "192", "193", "193*",
		"194", "194*", "195", "196", "197", "198", "199", "200", "201:01:0",
		"201:02:0", "202", "203:01:0", "203:02:0", "204", "205", "206", "207",
		"208", "209", "210", "211", "212", "213", "214", "215", "216", "217",
		"218", "219", "220", "221", "222:01:0", "222:02:0", "223", "224:01:0",
		"224:02:0", "225", "226", "227:01:0", "227:02:0", "228:01:0",
		"228:02:0", "229", "230");

var eleSymbMass = [];
eleSymbMass[0] = "select";
eleSymbMass[1] = 1.00;
eleSymbMass[2] = 4.00;
eleSymbMass[3] = 6.94;
eleSymbMass[4] = 9.01;
eleSymbMass[5] = 10.81;
eleSymbMass[6] = 12.01;
eleSymbMass[7] = 14.01;
eleSymbMass[8] = 16.00;
eleSymbMass[9] = 19.00;
eleSymbMass[10] = 20.18;
eleSymbMass[11] = 22.99;
eleSymbMass[12] = 24.31;
eleSymbMass[13] = 26.98;
eleSymbMass[14] = 28.09;
eleSymbMass[15] = 30.97;
eleSymbMass[16] = 32.06;
eleSymbMass[17] = 35.45;
eleSymbMass[18] = 39.95;
eleSymbMass[19] = 39.10;
eleSymbMass[20] = 40.08;
eleSymbMass[21] = 44.96;
eleSymbMass[22] = 47.88;
eleSymbMass[23] = 50.94;
eleSymbMass[24] = 52.00;
eleSymbMass[25] = 54.94;
eleSymbMass[26] = 55.85;
eleSymbMass[27] = 58.93;
eleSymbMass[28] = 58.69;
eleSymbMass[29] = 63.55;
eleSymbMass[30] = 65.38;
eleSymbMass[31] = 69.72;
eleSymbMass[32] = 72.59;
eleSymbMass[33] = 74.92;
eleSymbMass[34] = 78.96;
eleSymbMass[35] = 79.90;
eleSymbMass[36] = 83.80;
eleSymbMass[37] = 85.47;
eleSymbMass[38] = 87.62;
eleSymbMass[39] = 88.91;
eleSymbMass[40] = 91.22;
eleSymbMass[41] = 92.91;
eleSymbMass[42] = 95.94;
eleSymbMass[43] = 98.00;
eleSymbMass[44] = 101.07;
eleSymbMass[45] = 102.91;
eleSymbMass[46] = 106.42;
eleSymbMass[47] = 107.87;
eleSymbMass[48] = 112.41;
eleSymbMass[49] = 114.82;
eleSymbMass[50] = 118.69;
eleSymbMass[51] = 121.75;
eleSymbMass[52] = 127.60;
eleSymbMass[53] = 126.90;
eleSymbMass[54] = 131.29;
eleSymbMass[55] = 132.91;
eleSymbMass[56] = 137.34;
eleSymbMass[57] = 138.91;
eleSymbMass[58] = 140.12;
eleSymbMass[59] = 140.91;
eleSymbMass[60] = 144.24;
eleSymbMass[61] = 145.00;
eleSymbMass[62] = 150.36;
eleSymbMass[63] = 151.96;
eleSymbMass[64] = 157.25;
eleSymbMass[65] = 158.93;
eleSymbMass[66] = 162.50;
eleSymbMass[67] = 164.93;
eleSymbMass[68] = 167.26;
eleSymbMass[69] = 168.93;
eleSymbMass[70] = 173.04;
eleSymbMass[71] = 174.97;
eleSymbMass[72] = 178.49;
eleSymbMass[73] = 180.95;
eleSymbMass[74] = 183.85;
eleSymbMass[75] = 186.21;
eleSymbMass[76] = 190.20;
eleSymbMass[77] = 192.22;
eleSymbMass[78] = 195.09;
eleSymbMass[79] = 196.97;
eleSymbMass[80] = 200.59;
eleSymbMass[81] = 204.38;
eleSymbMass[82] = 207.19;
eleSymbMass[83] = 208.98;
eleSymbMass[84] = 209.00;
eleSymbMass[85] = 210.00;
eleSymbMass[86] = 222.00;
eleSymbMass[87] = 223.00;
eleSymbMass[88] = 226.00;
eleSymbMass[89] = 227.00;
eleSymbMass[90] = 232.04;
eleSymbMass[91] = 231.04;
eleSymbMass[92] = 238.04;
eleSymbMass[93] = 237.05;
eleSymbMass[94] = 244.00;
eleSymbMass[95] = 243.00;
eleSymbMass[96] = 247.00;
eleSymbMass[97] = 247.00;
eleSymbMass[98] = 251.00;
eleSymbMass[99] = 252.00;
