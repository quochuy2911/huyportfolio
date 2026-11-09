export const portfolio = {
  name: 'Ngo Quoc Huy',
  url: 'https://quochuy2911.github.io/huyportfolio/',
  location: 'Ho Chi Minh City, Vietnam',
  analytics: 'G-483XGGC9Y9',
  links: {
    GitHub: 'https://github.com/quochuy2911',
    LinkedIn: 'https://www.linkedin.com/in/quochuyngo/',
  },
};

export const projects = [
  {
    slug: 'beam-structural-health-monitoring', legacy: '05_shm_project.html',
    title: 'Finding damage with sparse strain measurements',
    category: 'Experimental mechanics', year: '2026', featured: true,
    summary: 'An instrumented four-point bending rig and a physics-informed model for estimating where a beam has lost stiffness.',
    image: ['beam-bench.webp', 'Four-point bending test rig with an aluminum beam and a laptop alongside the frame', 1280, 720],
    imageCaption: 'The Fulbright beam-bending apparatus during its development.',
    tools: ['Python', 'PyTorch', 'Raspberry Pi', 'Strain gauges', 'Finite elements'],
    role: 'Capstone researcher and contributor to the test bench’s instrumentation and control.',
    sections: [
      ['The question', 'If sensors are installed before a structure is damaged, can a sparse set of measurements help locate a loss of stiffness? I used a simply supported aluminum beam in four-point bending so the mechanics and loading were well defined.'],
      ['From bench to model', 'I worked on the electronics and software connecting the sensors, actuators, and Raspberry Pi. For the capstone, I used paired strain gauges on the top and bottom of the beam at seven stations. The forward model reconstructed beam response from sparse measurements, while the inverse model used a differentiable beam solver to estimate stiffness across seven segments.'],
      ['What the experiment showed', 'In a test with a machined pocket in Segment 5, the inverse model identified a stiffness reduction in that segment and also flagged an undamaged segment. The result shows where the method was informative and where it remained ambiguous. The estimated stiffness loss describes the beam’s response at segment scale.'],
    ],
    facts: [['1.2 m', 'Support span'], ['14', 'Strain gauges'], ['7', 'Stiffness segments']],
    gallery: [
      ['beam-controls.webp', 'The instrumentation box and control interface on the bending apparatus', 'Instrumentation and control setup', 563, 1000],
      ['beam-machining.webp', 'A workpiece being machined on a CNC mill during apparatus development', 'Machining during apparatus development', 920, 690],
    ],
    links: [['Research code on GitHub', 'https://github.com/quochuy2911/Fulbright_SHM_PINN']],
  },
  {
    slug: 'astronomical-tracking-mount', legacy: '06_eqmount_mechdes.html',
    title: 'A four-axis mount for astronomical tracking',
    category: 'Mechanical design', year: '2024', featured: true,
    summary: 'A telescope-mount redesign built around precision gearing, adjustability, and a prototype I could fabricate.',
    image: ['mount-cad.webp', 'CAD assembly of a telescope mounted above an articulated drive', 1000, 696],
    imageCaption: 'CAD assembly of the four-axis mount.',
    tools: ['CAD', 'Worm gearing', 'Prototyping', 'Machining'],
    role: 'Individual mechanical-design course project.',
    sections: [
      ['Starting from an older build', 'I revisited the telescope mount I built in high school. The new design separated the adjustments used to set up the mount from the axes used to point the telescope and follow objects across the sky.'],
      ['Designing the drive', 'The design uses worm gearing with an anti-backlash arrangement. I modeled the assemblies around the drive and telescope mount, then made a physical prototype to explore how the parts could be fabricated and assembled.'],
      ['Where the project stopped', 'The work shown here covers the mechanical design and prototype. Completing the tracking controller and measuring on-sky accuracy were planned next steps.'],
    ],
    gallery: [
      ['mount-prototype.webp', 'Early physical telescope-mount prototype on a tripod', 'First physical prototype', 750, 1000],
      ['mount-drive.webp', 'CAD detail of the worm-drive and mount housing', 'Drive assembly detail', 731, 656],
    ],
  },
  {
    slug: 'vsa3d-studio',
    title: 'VSA3D Studio',
    category: 'Engineering software', year: '2026', featured: true,
    summary: 'A personal prototype for exploring how part tolerances contribute to variation in an assembly.',
    image: ['tolerance-study.svg', 'Illustrative tolerance study with a pair of surfaces and a simulated result distribution', 720, 465],
    imageCaption: 'An illustrative study diagram drawn for this portfolio.',
    tools: ['Monte Carlo', 'Tolerance analysis', 'CAD geometry'],
    role: 'Personal software prototype.',
    sections: [
      ['The question', 'When parts vary within their manufacturing tolerances, which inputs drive variation in the assembled result? I wanted a small tool that made the connection between the geometry, the tolerance assumptions, and the output easier to inspect.'],
      ['How the prototype works', 'The prototype supports plane-to-plane distance measurements, including planes on different components. Monte Carlo sampling propagates input variation through the study so that the resulting spread can be inspected alongside the underlying measurement definition.'],
      ['What I’m exploring', 'I’m interested in making tolerance studies easier to audit. A reviewer should be able to trace a result back to the features, assumptions, and input distributions that produced it.'],
    ],
  },
  {
    slug: 'fingerprint-cabinet-lock', legacy: '03_fingerprint.html',
    title: 'Fingerprint cabinet lock',
    category: 'Electronics', year: '2023',
    summary: 'A course-team prototype that paired a custom PCB with a fingerprint sensor and a physical enclosure.',
    image: ['fingerprint-case.webp', 'Front face of a cabinet-lock prototype with a display and fingerprint reader', 850, 850],
    imageCaption: 'Front of the assembled lock prototype.',
    tools: ['Altium Designer', 'PCB design', 'Prototyping'],
    role: 'Team member in an electrical circuits and devices course.',
    sections: [
      ['The build', 'Our team designed a cabinet lock with a fingerprint sensor and an administrator mode for managing enrolled users. We designed the PCB in Altium Designer and integrated it with the sensor, display, and enclosure.'],
      ['What I took from it', 'Designing for the enclosure made connector placement, wiring access, and assembly order part of the electronics problem.'],
    ],
    gallery: [['fingerprint-pcb.webp', '3D CAD view of the custom fingerprint-lock circuit board', 'Circuit board in Altium Designer', 632, 651]],
  },
  {
    slug: 'facility-access-logic', legacy: '04_fsm_facility_management.html',
    title: 'Facility access in logic gates',
    category: 'Digital logic', year: '2023',
    summary: 'A CircuitVerse simulation of facility access rules and usage tracking using a Moore state machine.',
    image: ['logic-simulation.webp', 'CircuitVerse diagram of the facility access system', 860, 658],
    imageCaption: 'CircuitVerse view of the logic system.',
    tools: ['CircuitVerse', 'Finite-state machines', 'Digital logic'],
    role: 'Individual computer organization course project.',
    sections: [
      ['The build', 'I built a logic-gate simulation to verify student access to a facility under time and usage constraints. A Moore state machine modeled the control flow, with supporting circuits for decoding, counting, and display.'],
    ],
    gallery: [['logic-decoder.webp', 'Gate-level schematic of a decoder in the CircuitVerse model', 'Decoder schematic', 800, 592]],
  },
  {
    slug: 'pneumatic-wood-stabilization', legacy: '02_wood_stabilizing.html',
    title: 'Pneumatic wood stabilization',
    category: 'Pneumatics', year: '2019–20',
    summary: 'A high-school build that automated steps in a vacuum-and-pressure resin treatment for wood.',
    image: ['wood-machine.webp', 'Wood-stabilization prototype with its controls and treatment equipment mounted together', 900, 674],
    imageCaption: 'The wood-stabilization prototype.',
    tools: ['Pneumatics', 'Electrical controls', 'Fabrication'],
    role: 'Individual high-school science and engineering project.',
    sections: [
      ['The build', 'I built a system to automate steps in impregnating wood with resin under vacuum and pressure. The prototype combined a treatment chamber, pneumatic valves, and electrical controls.'],
      ['The fair', 'The project placed first at the 2020 provincial science and engineering fair.'],
    ],
    gallery: [['wood-pneumatics.webp', 'Pneumatic tubing and hardware inside the wood-stabilization machine', 'Pneumatic hardware and routing', 621, 469]],
  },
  {
    slug: 'first-telescope-mount', legacy: '01_nirvana_interference_telescope.html',
    title: 'My first telescope mount',
    category: 'Mechanical design', year: '2018–19',
    summary: 'A two-axis, stepper-driven telescope mount controlled from a laptop.',
    image: ['early-mount.webp', 'Original motorized telescope mount photographed in a workshop', 826, 1000],
    imageCaption: 'The original telescope-mount build.',
    tools: ['SolidWorks', 'Stepper motors', 'Gearing'],
    role: 'Individual high-school science and engineering project.',
    sections: [
      ['The build', 'I designed and made a two-axis mount that could point a telescope from astronomical coordinates. Stepper motors drove the axes, with commands sent from a laptop.'],
      ['The fair', 'The project placed fourth at the 2019 national science and engineering fair. The mechanics later became the starting point for my four-axis design.'],
    ],
    gallery: [['early-mount-cad.webp', 'SolidWorks model of the original telescope mount and tripod', 'Original CAD assembly', 806, 717]],
  },
];

export const timeline = [
  ['Current', 'Mechanical Designer', 'Bosch Automotive R&D Center Vietnam', 'I work on mechanical drawings, design documentation, and product improvement in automotive R&D. My earlier experience at Bosch also included test-bench work and engineering data analysis.'],
  ['2026', 'Human-centered Engineering', 'Fulbright University Vietnam', 'I graduated with honors. My capstone on physics-informed beam damage identification earned Capstone Honors.'],
  ['2022–24', 'Research and teaching assistant', 'Fulbright University Vietnam', 'I contributed to the beam-bending research apparatus and supported hands-on coursework in fabrication, electronics, and measurement.'],
];

export const skills = [
  ['Mechanical design', 'CAD assemblies, engineering drawings, tolerance analysis, and designing parts for fabrication.'],
  ['Testing and instrumentation', 'Strain gauges, load measurement, motor control, Raspberry Pi, and bench data acquisition.'],
  ['Engineering computation', 'Python, PyTorch, finite-element modeling, physics-informed learning, and analysis of measured signals.'],
];
