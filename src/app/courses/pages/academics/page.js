"use client";

import { useState } from "react";
import ChatbotIcon from "@/app/components/ChatbotIcon/ChatbotIcon";

export default function AcademicsPage() {
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");

  const branches = ["CSE", "ECE", "MAE"];
  const semesters = [
    "Semester I",
    "Semester II",
    "Semester III",
    "Semester IV",
    "Semester V",
    "Semester VI",
    "Semester VII",
  ];

  const syllabusLinks = {
    CSE: {
      "Semester I":
        "https://iiitbh.ac.in/sites/default/files/html-page/CSE/1st%20Semester.pdf",
      "Semester II":
        "https://iiitbh.ac.in/sites/default/files/html-page/CSE/2nd%20Semester.pdf",
      "Semester III":
        "https://iiitbh.ac.in/sites/default/files/html-page/CSE/3rd%20Semester.pdf",
      "Semester IV":
        "https://iiitbh.ac.in/sites/default/files/html-page/CSE/4th%20Semester.pdf",
      "Semester V":
        "https://iiitbh.ac.in/sites/default/files/html-page/CSE/5th%20Semester.pdf",
      "Semester VI":
        "https://iiitbh.ac.in/sites/default/files/html-page/CSE/6th%20Semester.pdf",
      "Semester VII":
        "https://iiitbh.ac.in/sites/default/files/html-page/CSE/7th%20Semester.pdf",
    },
    ECE: {
      "Semester I":
        "https://iiitbh.ac.in/sites/default/files/html-page/ECE/1st%20Semester.pdf",
      "Semester II":
        "https://iiitbh.ac.in/sites/default/files/html-page/ECE/2nd%20Semester.pdf",
      "Semester III":
        "https://iiitbh.ac.in/sites/default/files/html-page/ECE/3rd%20Semester.pdf",
      "Semester IV":
        "https://iiitbh.ac.in/sites/default/files/html-page/ECE/4th%20Semester.pdf",
      "Semester V":
        "https://iiitbh.ac.in/sites/default/files/html-page/ECE/5th%20Semester.pdf",
      "Semester VI":
        "https://iiitbh.ac.in/sites/default/files/html-page/ECE/6th%20Semester.pdf",
      "Semester VII":
        "https://iiitbh.ac.in/sites/default/files/html-page/ECE/7th%20Semester.pdf",
    },
    MAE: {
      "Semester I":
        "https://iiitbh.ac.in/sites/default/files/html-page/MEA/Sem_1.pdf",
      "Semester II":
        "https://iiitbh.ac.in/sites/default/files/html-page/MEA/Sem_2.pdf",
      "Semester III":
        "https://iiitbh.ac.in/sites/default/files/html-page/MEA/Sem_3.pdf",
      "Semester IV":
        "https://iiitbh.ac.in/sites/default/files/html-page/MEA/Sem_4.pdf",
      "Semester V":
        "https://iiitbh.ac.in/sites/default/files/html-page/MEA/Sem_5.pdf",
      "Semester VI":
        "https://iiitbh.ac.in/sites/default/files/html-page/MEA/Sem_6.pdf",
      "Semester VII":
        "https://iiitbh.ac.in/sites/default/files/html-page/MEA/Sem_7.pdf",
    },
  };

  const getSubjects = (branch, semester) => {
    const subjects = {
      CSE: {
        "Semester I": [
          {
            name: "Engineering Mathematics-I (MA101)",
            bookLink:
              "https://wp.kntu.ac.ir/dfard/ebook/em/Advanced%20Engineering%20Mathematics%2010th%20Edition.pdf",
          },
          {
            name: "Engineering Physics (PH101)",
            bookLink:
              "http://wigner.elte.hu/koltai/griffiths_quantum_mechanics_2nd_edition.pdf",
          },
          {
            name: "Electrical Sciences (EC101)",
            bookLink:
              "https://www.candle.center/_files/ugd/defd98_c60dd719383846e8833d5017e396bd3e.pdf",
          },
          {
            name: "Computer Programming (CS101)",
            bookLink:
              "https://www.cimat.mx/ciencia_para_jovenes/bachillerato/libros/%5BKernighan-Ritchie%5DThe_C_Programming_Language.pdf",
          },
          {
            name: "Professional Communication (HS101)",
            bookLink:
              "https://www.scribd.com/document/492774226/R-C-Sharma-Krishna-Mohan-Business-Correspondence-and-Report-Writing-a-Practical-Approach-to-Business-Technical-Communication-Mc-Graw-Hill-Ind",
          },
          {
            name: "Engineering Graphics (ME102)",
            bookLink:
              "https://soaneemrana.com/onewebmedia/ENGINEERING%20DRAWING%20BY%20N.D%20BHATT.pdf",
          },
        ],
        "Semester II": [
          {
            name: "Engineering Mathematics-II (MA102)",
            bookLink:
              "https://wp.kntu.ac.ir/dfard/ebook/em/Advanced%20Engineering%20Mathematics%2010th%20Edition.pdf",
          },
          {
            name: "Data Structures & Algorithms (CS102)",
            bookLink:
              "https://gnindia.dronacharya.info/IT/3rdSem/Downloads/DataStructure/Books/DATA-STRUCTURE-BOOK-3.pdf",
          },
          {
            name: "Digital Design (EC102)",
            bookLink:
              "https://ia600607.us.archive.org/3/items/DigitalLogicAndComputerDesignByM.MorrisMano2ndEdition/Digital%20Logic%20And%20Computer%20Design%20By%20M.%20Morris%20Mano%20%282nd%20Edition%29.pdf",
          },
          {
            name: "Semiconductor Devices and Circuits (EC104)",
            bookLink:
              "https://s3-us-west-2.amazonaws.com/valpont/uploads/20151124213927/Semiconductor_Device_Fundamentals1.pdf",
          },
          {
            name: "Engineering Materials (ME103)",
            bookLink:
              "https://anupturnedworld.wordpress.com/wp-content/uploads/2016/06/callister-materials-science-and-engineering.pdf",
          },
        ],
        "Semester III": [
          {
            name: "Engineering Mathematics III (MA201)",
            bookLink:
              "https://wp.kntu.ac.ir/dfard/ebook/em/Advanced%20Engineering%20Mathematics%2010th%20Edition.pdf",
          },
          {
            name: "Object Oriented Programming (CS203)",
            bookLink:
              "https://www.anandinstitute.org/pdf/Balaguruswamy%20Object%20Oriented%20Programming%20With%20C++%20Fourth%20Edition%20(3).pdf",
          },
          {
            name: "Discrete Mathematics (CS202)",
            bookLink:
              "https://vijayrampeesa.wordpress.com/wp-content/uploads/2016/02/dms-txt-book.pdf",
          },
          {
            name: "Design and Analysis of Algorithms (CS201)",
            bookLink:
              "http://139.59.56.236/bitstream/123456789/106/1/Introduction%20to%20Algorithms%20by%20Thomas%20%20H%20Coremen.pdf",
          },
          {
            name: "Computer Organization and Architecture (CS207)",
            bookLink:
              "https://www.cse.iitd.ac.in/~rijurekha/col216/edition5.pdf",
          },
          // {
          //   name: "Management Concepts and Technology (HS201)",
          //   bookLink: "https://example.com/book11",
          // },
        ],
        "Semester IV": [
          {
            name: "Operating Systems (CS206)",
            bookLink:
              "https://scs.dypvp.edu.in/documents/e-books/OS/Operating_System_Concepts_8th_EditionA4.pdf",
          },
          {
            name: "Formal Language and Automata Theory (CS205)",
            bookLink:
              "https://www-2.dc.uba.ar/staff/becher/Hopcroft-Motwani-Ullman-2001.pdf",
          },
          {
            name: "Microprocessor and Interfacing (EC208)",
            bookLink:
              "https://adityaeeeb.weebly.com/uploads/4/2/0/0/42007913/mpmc_textbook_godse.pdf",
          },
          {
            name: "Database Management Systems (CS204)",
            bookLink:
              "https://people.vts.su.ac.rs/~peti/Baze%20podataka/Literatura/Silberschatz-Database%20System%20Concepts%206th%20ed.pdf",
          },
          {
            name: "Probability and Statistics (CS203)",
            bookLink:
              "https://tiu-edu.uz/media/books/2024/05/28/1665037283.pdf",
          },
        ],
        "Semester V": [
          {
            name: "Digital Signal Processing (EC301)",
            bookLink:
              "https://www.srecwarangal.ac.in/ece-downloads/Digital_Signal_Processing___Proakis_and_Manolakis.pdf",
          },
          {
            name: "Data Communication (CS301)",
            bookLink:
              "https://dpvipracollege.in/wp-content/uploads/2023/01/Data-Communications-and-Networking-By-Behrouz-A.Forouzan.pdf",
          },
          {
            name: "Software Engineering (CS302)",
            bookLink: "https://invent.ilmkidunya.com/images/Section/12.pdf",
          },
          {
            name: "IoT and Embedded System (EC304)",
            bookLink:
              "http://mazsola.iit.uni-miskolc.hu/~drdani/docs_arm/36_Elsevier-ARM_Sy.pdf",
          },
          {
            name: "Artificial Intelligence (CS303)",
            bookLink:
              "https://dpvipracollege.in/wp-content/uploads/2023/01/Russell-S.-Norvig-P.-Artificial-intelligence-a-modern-approach-2edPH2003T1112s.pdf",
          },
        ],
        "Semester VI": [
          {
            name: "Compiler Design (CS304)",
            bookLink:
              "https://mrce.in/ebooks/Compilers%20Principles,%20Techniques,%20&%20Tools%202nd%20Ed.pdf",
          },
          {
            name: "Computer Networks (CS305)",
            bookLink:
              "https://dl.ebooksworld.ir/motoman/MK.Computer.Networks.Fifth.Edition.A.Systems.Approach.www.EBooksWorld.ir.pdf",
          },
          {
            name: "Computer Graphics (EC306)",
            bookLink:
              "https://drive.uqu.edu.sa/_/mskhayat/files/MySubjects/2019SumS_ComputerGraphics/Computer%20Graphics%20with%20OpenGL%20(4th%20ed_)%20%5BHearn,%20Baker%20&%20Carithers%202013%5D.pdf",
          },
          {
            name: "Machine Learning (CS307)",
            bookLink:
              "https://kkpatel7.wordpress.com/wp-content/uploads/2015/04/alppaydin_machinelearning_2010.pdf",
          },
          {
            name: "Environmental Sciences & Green Technology (ME306)",
            bookLink:
              "https://joycelau99.wordpress.com/wp-content/uploads/2020/10/introduction-to-environmental-engineering.pdf",
          },
        ],
        "Semester VII": [
          {
            name: "Professional Ethics for Engineers (HS401)",
            bookLink:
              "https://annamalaiuniversity.ac.in/studport/download/engg/mech/learning/NKN_Ethics_in_Engg.pdf",
          },
          // Electives portion needs to be updated
        ],
        // Add more semesters and subjects for CSE
      },
      ECE: {
        "Semester I": [
          {
            name: "Engineering Mathematics-I (MA101)",
            bookLink:
              "https://wp.kntu.ac.ir/dfard/ebook/em/Advanced%20Engineering%20Mathematics%2010th%20Edition.pdf",
          },
          {
            name: "Engineering Physics (PH101)",
            bookLink:
              "http://wigner.elte.hu/koltai/griffiths_quantum_mechanics_2nd_edition.pdf",
          },
          {
            name: "Electrical Sciences (EC101)",
            bookLink:
              "https://www.candle.center/_files/ugd/defd98_c60dd719383846e8833d5017e396bd3e.pdf",
          },
          {
            name: "Computer Programming (CS101)",
            bookLink:
              "https://www.cimat.mx/ciencia_para_jovenes/bachillerato/libros/%5BKernighan-Ritchie%5DThe_C_Programming_Language.pdf",
          },
          {
            name: "Professional Communication (HS101)",
            bookLink:
              "https://www.scribd.com/document/492774226/R-C-Sharma-Krishna-Mohan-Business-Correspondence-and-Report-Writing-a-Practical-Approach-to-Business-Technical-Communication-Mc-Graw-Hill-Ind",
          },
          {
            name: "Engineering Graphics (ME102)",
            bookLink:
              "https://soaneemrana.com/onewebmedia/ENGINEERING%20DRAWING%20BY%20N.D%20BHATT.pdf",
          },
        ],
        "Semester II": [
          {
            name: "Engineering Mathematics-II (MA102)",
            bookLink:
              "https://wp.kntu.ac.ir/dfard/ebook/em/Advanced%20Engineering%20Mathematics%2010th%20Edition.pdf",
          },
          {
            name: "Data Structures & Algorithms (CS102)",
            bookLink:
              "https://gnindia.dronacharya.info/IT/3rdSem/Downloads/DataStructure/Books/DATA-STRUCTURE-BOOK-3.pdf",
          },
          {
            name: "Digital Design (EC102)",
            bookLink:
              "https://ia600607.us.archive.org/3/items/DigitalLogicAndComputerDesignByM.MorrisMano2ndEdition/Digital%20Logic%20And%20Computer%20Design%20By%20M.%20Morris%20Mano%20%282nd%20Edition%29.pdf",
          },
          {
            name: "Semiconductor Devices and Circuits (EC104)",
            bookLink:
              "https://s3-us-west-2.amazonaws.com/valpont/uploads/20151124213927/Semiconductor_Device_Fundamentals1.pdf",
          },
          {
            name: "Engineering Materials (ME103)",
            bookLink:
              "https://anupturnedworld.wordpress.com/wp-content/uploads/2016/06/callister-materials-science-and-engineering.pdf",
          },
        ],
        "Semester III": [
          {
            name: "Engineering Mathematics III (MA201)",
            bookLink:
              "https://wp.kntu.ac.ir/dfard/ebook/em/Advanced%20Engineering%20Mathematics%2010th%20Edition.pdf",
          },
          {
            name: "Object Oriented Programming (CS203)",
            bookLink:
              "https://www.anandinstitute.org/pdf/Balaguruswamy%20Object%20Oriented%20Programming%20With%20C++%20Fourth%20Edition%20(3).pdf",
          },
          {
            name: "Analog Communication (EC207)",
            bookLink:
              "https://ggnindia.dronacharya.info/Downloads/Sub-info/RelatedBook/4thSem/Communication-System-text-book-6.pdf",
          },
          {
            name: "Electromagnetic Theory (EC201)",
            bookLink:
              "https://himanshuagrahari.wordpress.com/wp-content/uploads/2015/06/ida-engineering-electromagnetics.pdf",
          },
          {
            name: "Measurement & Instrumentation (EC209)",
            bookLink:
              "https://gnindia.dronacharya.info/EEE/3rdSem/Downloads/ElectricalMeasurmentMeasuringInstruments/Books/ELECTRICAL-MEASUREMENTS-INSTRUMENTATION-Reference-Book-3.pdf",
          },
        ],
        "Semester IV": [
          {
            name: "Analog Electronics (EC203)",
            bookLink:
              "https://wp.kntu.ac.ir/dfard/ebook/em/Advanced%20Engineering%20Mathematics%2010th%20Edition.pdf",
          },
          {
            name: "Digital Communication (EC204)",
            bookLink:
              "https://gnindia.dronacharya.info/IT/3rdSem/Downloads/DataStructure/Books/DATA-STRUCTURE-BOOK-3.pdf",
          },
          {
            name: "Microprocessor and Interfacing (EC208)",
            bookLink:
              "https://adityaeeeb.weebly.com/uploads/4/2/0/0/42007913/mpmc_textbook_godse.pdf",
          },
          {
            name: "Signals and Systems (EC202)",
            bookLink:
              "https://materias.df.uba.ar/l5a2021c1/files/2021/05/Alan-V.-Oppenheim-Alan-S.-Willsky-with-S.-Hamid-Signals-and-Systems-Prentice-Hall-1996.pdf",
          },
          {
            name: "Probability and Statistics (CS203)",
            bookLink:
              "https://tiu-edu.uz/media/books/2024/05/28/1665037283.pdf",
          },
        ],
        "Semester V": [
          {
            name: "Digital Signal Processing (EC301)",
            bookLink:
              "https://www.srecwarangal.ac.in/ece-downloads/Digital_Signal_Processing___Proakis_and_Manolakis.pdf",
          },
          {
            name: "Control Systems (EC302)",
            bookLink:
              "https://gcebargur.ac.in/sites/gcebargur.ac.in/files/lectures_desk/Digital%20Control%20and%20State%20Variable%20Methods%20M%20Gopal.pdf",
          },
          {
            name: "Introduction to VLSI Design (EC303)",
            bookLink:
              "https://booksonweb.wordpress.com/wp-content/uploads/2011/11/digital-integrated-circuits-a-design-perspective-by-jan-m-rabaey.pdf",
          },
          {
            name: "IoT and Embedded System (EC304)",
            bookLink:
              "http://mazsola.iit.uni-miskolc.hu/~drdani/docs_arm/36_Elsevier-ARM_Sy.pdf",
          },
          {
            name: "Artificial Intelligence (CS303)",
            bookLink:
              "https://dpvipracollege.in/wp-content/uploads/2023/01/Russell-S.-Norvig-P.-Artificial-intelligence-a-modern-approach-2edPH2003T1112s.pdf",
          },
        ],
        "Semester VI": [
          {
            name: "Antenna & Microwave Engineering (EC305)",
            bookLink:
              "http://mwl.diet.uniroma1.it/people/pisa/RFELSYS/MATERIALE%20INTEGRATIVO/BOOKS/Pozar_Microwave%20Engineering(2012).pdf",
          },
          {
            name: "Optical Communication & Networks (EC306)",
            bookLink:
              "https://gsundar.weebly.com/uploads/5/4/5/6/54560163/optical_fiber_communication_by_gerd_keiser.pdf",
          },
          {
            name: "Computer Vision and Image Processing (EC307)",
            bookLink:
              "https://oms.bdu.ac.in/ec/admin/contents/9_P16CSE5C_2020052007532478.pdf",
          },
          {
            name: "Recent Trends in Wireless Communication (EC308)",
            bookLink: "http://www.ee.ic.ac.uk/bruno.clerckx/All.pdf",
          },
          {
            name: "Environmental Sciences & Green Technology (ME306)",
            bookLink:
              "https://joycelau99.wordpress.com/wp-content/uploads/2020/10/introduction-to-environmental-engineering.pdf",
          },
        ],
        "Semester VII": [
          {
            name: "Professional Ethics for Engineers (HS401)",
            bookLink:
              "https://annamalaiuniversity.ac.in/studport/download/engg/mech/learning/NKN_Ethics_in_Engg.pdf",
          },
          // Electives portion needs to be updated
        ],
        // Add more semesters and subjects for CSE
      },
      MAE: {
        "Semester I": [
          {
            name: "Engineering Mathematics-I (MA101)",
            bookLink:
              "https://wp.kntu.ac.ir/dfard/ebook/em/Advanced%20Engineering%20Mathematics%2010th%20Edition.pdf",
          },
          {
            name: "Engineering Physics (PH101)",
            bookLink:
              "http://wigner.elte.hu/koltai/griffiths_quantum_mechanics_2nd_edition.pdf",
          },
          {
            name: "Electrical Sciences (EC101)",
            bookLink:
              "https://www.candle.center/_files/ugd/defd98_c60dd719383846e8833d5017e396bd3e.pdf",
          },
          {
            name: "Computer Programming (CS101)",
            bookLink:
              "https://www.cimat.mx/ciencia_para_jovenes/bachillerato/libros/%5BKernighan-Ritchie%5DThe_C_Programming_Language.pdf",
          },
          {
            name: "Professional Communication (HS101)",
            bookLink:
              "https://www.scribd.com/document/492774226/R-C-Sharma-Krishna-Mohan-Business-Correspondence-and-Report-Writing-a-Practical-Approach-to-Business-Technical-Communication-Mc-Graw-Hill-Ind",
          },
          {
            name: "Engineering Graphics (ME102)",
            bookLink:
              "https://soaneemrana.com/onewebmedia/ENGINEERING%20DRAWING%20BY%20N.D%20BHATT.pdf",
          },
        ],
        "Semester II": [
          {
            name: "Engineering Mathematics-II (MA102)",
            bookLink:
              "https://wp.kntu.ac.ir/dfard/ebook/em/Advanced%20Engineering%20Mathematics%2010th%20Edition.pdf",
          },
          {
            name: "Data Structures & Algorithms (CS102)",
            bookLink:
              "https://gnindia.dronacharya.info/IT/3rdSem/Downloads/DataStructure/Books/DATA-STRUCTURE-BOOK-3.pdf",
          },
          {
            name: "Digital Design (EC102)",
            bookLink:
              "https://ia600607.us.archive.org/3/items/DigitalLogicAndComputerDesignByM.MorrisMano2ndEdition/Digital%20Logic%20And%20Computer%20Design%20By%20M.%20Morris%20Mano%20%282nd%20Edition%29.pdf",
          },
          {
            name: "Semiconductor Devices and Circuits (EC104)",
            bookLink:
              "https://s3-us-west-2.amazonaws.com/valpont/uploads/20151124213927/Semiconductor_Device_Fundamentals1.pdf",
          },
          {
            name: "Engineering Mechanics (ME101)",
            bookLink:
              "https://nitc.ac.in/imgserver/uploads/attachments/Ed__c1b5eba4-6a9c-4676-a730-53322d4e13b7_.pdf",
          },
        ],
        "Semester III": [
          {
            name: "Engineering Mathematics III (MA201)",
            bookLink:
              "https://wp.kntu.ac.ir/dfard/ebook/em/Advanced%20Engineering%20Mathematics%2010th%20Edition.pdf",
          },
          {
            name: "Object Oriented Programming (CS203)",
            bookLink:
              "https://www.anandinstitute.org/pdf/Balaguruswamy%20Object%20Oriented%20Programming%20With%20C++%20Fourth%20Edition%20(3).pdf",
          },
          {
            name: "Solid Mechanics (ME201)",
            bookLink:
              "https://esfahanian.iut.ac.ir/sites/esfahanian.iut.ac.ir/files/files_course/mechanics_of_materials_4th_edition_beer_johnston.pdf",
          },
          {
            name: "Thermodynamics (ME202)",
            bookLink:
              "https://www.kashaninejad.com/uploads/4/6/7/6/46761445/fundamentals_of_thermodynamics__6th_edition.pdf",
          },
          {
            name: "Electrical Machine (ME203)",
            bookLink:
              "https://electrovolt.ir/wp-content/uploads/2019/04/Electric-Machines-Kothari-Nagrath-4th-ElectroVolt.ir_.pdf",
          },
        ],
        "Semester IV": [
          {
            name: "Analog Electronics (EC203)",
            bookLink:
              "https://wp.kntu.ac.ir/dfard/ebook/em/Advanced%20Engineering%20Mathematics%2010th%20Edition.pdf",
          },
          {
            name: "Design of Machine Elements (ME204)",
            bookLink:
              "https://dl.icdst.org/pdfs/files3/ad7608c18e740b0e402c025fa3187de8.pdf",
          },
          {
            name: "Kinematics of Machines (ME205)",
            bookLink:
              "https://content.e-bookshelf.de/media/reading/L-8118423-a9deca2895.pdf",
          },
          {
            name: "Manufacturing Science (ME206)",
            bookLink:
              "https://www.pearsonhighered.com/assets/preface/0/1/3/5/0135228603.pdf",
          },
          {
            name: "Fluid Mechanics (ME207)",
            bookLink:
              "https://heidarpour.iut.ac.ir/sites/heidarpour.iut.ac.ir/files//u32/fluid.pdf",
          },
          {
            name: "Probability and Statistics (CS203)",
            bookLink:
              "https://tiu-edu.uz/media/books/2024/05/28/1665037283.pdf",
          },
        ],
        "Semester V": [
          {
            name: "Digital Signal Processing (EC301)",
            bookLink:
              "https://www.srecwarangal.ac.in/ece-downloads/Digital_Signal_Processing___Proakis_and_Manolakis.pdf",
          },
          {
            name: "Control Systems (EC302)",
            bookLink:
              "https://gcebargur.ac.in/sites/gcebargur.ac.in/files/lectures_desk/Digital%20Control%20and%20State%20Variable%20Methods%20M%20Gopal.pdf",
          },
          {
            name: "Dynamics of Machinery (ME301)",
            bookLink:
              "https://mrcet.com/downloads/digital_notes/ME/II%20year/Dynamics%20of%20Machinery.pdf",
          },
          {
            name: "Sensors and Actuators (ME302)",
            bookLink:
              "https://dl.ojocv.gov.et/admin_/book/Sensors%20and%20actuators%20_%20control%20systems%20instrumentation%20(%20PDFDrive%20).pdf",
          },
          {
            name: "IoT and Embedded System (EC304)",
            bookLink:
              "http://mazsola.iit.uni-miskolc.hu/~drdani/docs_arm/36_Elsevier-ARM_Sy.pdf",
          },
          {
            name: "Artificial Intelligence (CS303)",
            bookLink:
              "https://dpvipracollege.in/wp-content/uploads/2023/01/Russell-S.-Norvig-P.-Artificial-intelligence-a-modern-approach-2edPH2003T1112s.pdf",
          },
        ],
        "Semester VI": [
          {
            name: "Machine Learning (CS307)",
            bookLink:
              "https://kkpatel7.wordpress.com/wp-content/uploads/2015/04/alppaydin_machinelearning_2010.pdf",
          },
          {
            name: "Mechatronics and Automation (EC303)",
            bookLink:
              "https://annamalaiuniversity.ac.in/studport/download/engg/mech/learning/mechatronics.pdf",
          },
          {
            name: "Environmental Sciences & Green Technology (ME306)",
            bookLink:
              "https://joycelau99.wordpress.com/wp-content/uploads/2020/10/introduction-to-environmental-engineering.pdf",
          },
        ],
        "Semester VII": [
          {
            name: "Robotics (ME402)",
            bookLink:
              "https://vardhaman.org/wp-content/uploads/2021/03/ROBOTICS.pdf",
          },
          {
            name: "Professional Ethics for Engineers (HS401)",
            bookLink:
              "https://annamalaiuniversity.ac.in/studport/download/engg/mech/learning/NKN_Ethics_in_Engg.pdf",
          },
          // Electives portion needs to be updated
        ],
      },
    };

    return subjects[branch]?.[semester] || [];
  };

  const getSyllabusLink = (branch, semester) => {
    return syllabusLinks[branch]?.[semester] || "#";
  };

  return (
    <div className="p-6 bg-white max-w-3xl mx-auto rounded-lg shadow-md mt-16">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
        College Academics
      </h1>
      <p className="text-lg text-center text-gray-600 mb-6">
        Select your branch and semester to view available subjects, books, and
        syllabus.
      </p>

      <label
        htmlFor="branch"
        className="block text-lg font-semibold text-gray-800 mb-2"
      >
        Choose Branch:
      </label>
      <select
        id="branch"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
        className="w-full max-w-xs p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">--Select Branch--</option>
        {branches.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      {branch && (
        <>
          <label
            htmlFor="semester"
            className="block text-lg font-semibold text-gray-800 mb-2"
          >
            Choose Semester:
          </label>
          <select
            id="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full max-w-xs p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--Select Semester--</option>
            {semesters.map((s, index) => (
              <option key={index} value={s}>
                {s}
              </option>
            ))}
          </select>
        </>
      )}

      {branch && semester && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              {branch} - {semester}
            </h2>
            <a
              href={getSyllabusLink(branch, semester)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Syllabus
            </a>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Subject Book Links
          </h3>
          <ul className="list-none p-0">
            {getSubjects(branch, semester).map((subject, index) => (
              <li key={index} className="mb-3">
                <a
                  href={subject.bookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-lg font-medium hover:text-blue-800"
                >
                  {subject.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <ChatbotIcon />
    </div>

  );
}
