// Content taken verbatim from supplied effectsandsolutions.txt
export type Group = { title: string; items: string[] };

export const AFFECTED_POPULATION: Group[] = [
  {
    title: "Rainfall Trends and Urban Flooding",
    items: [
      "Annual rainfall increased by 12 mm per decade (1970–2020), with fewer rainy days.",
      "Extreme rainfall events increased, causing urban flooding in certain areas.",
    ],
  },
  {
    title: "Population Groups Vulnerable to Urban Flooding",
    items: [
      "Children, elderly, women, and those with special needs are most impacted by urban flooding.",
      "Limited access to health facilities, emergency services, and urban services during floods mainly affects these groups.",
      "They also suffer from a lack of inclusive infrastructure and access to information.",
      "The urban poor living in compromised housing conditions and with limited access to health centres are susceptible to disease outbreaks.",
    ],
  },
  {
    title: "Extent of Vulnerability",
    items: [
      "Approximately 9.5% of the city's population, i.e., 0.7 million (0.3 million females, 0.4 million males), is vulnerable to urban flooding.",
      "Vulnerable areas encompass about 4.3% of the city's overall area.",
    ],
  },
];

export const POPULATION_STATS = [
  { value: "9.5%", label: "of city population vulnerable" },
  { value: "0.7M", label: "people (0.3M female, 0.4M male)" },
  { value: "4.3%", label: "of city area vulnerable" },
  { value: "+12 mm", label: "annual rainfall per decade (1970–2020)" },
];

export const SAFETY_MEASURES: Group[] = [
  {
    title: "Avoid Floodwater Exposure",
    items: [
      "Never enter moving floodwaters.",
      "Avoid exposure to floodwaters.",
      "Wash exposed skin frequently.",
      "Clean and cover any exposed or open wounds.",
    ],
  },
  {
    title: "Prevent Electrical and Equipment-Related Hazards",
    items: [
      "Always ensure that power is turned off before entering any flooded area and avoid touching any exposed electrical lines.",
      "Only use equipment that is approved for use in water.",
      "Never operate gas-powered equipment indoors.",
      "Never operate a generator indoors or near open windows or doors.",
    ],
  },
  {
    title: "Prevent Structural and Environmental Hazards",
    items: [
      "Make sure your home is safe to enter after any flooding event. Floodwaters can damage the foundation and cause structural damage that makes a building unsafe to enter.",
      "Carefully check for snakes, venomous insects, and wild animals sheltering in your home. Notify animal control for removal of stray pets or wild animals.",
    ],
  },
  {
    title: "Protect Against Temperature-Related Health Risks",
    items: [
      "Be aware of the temperature.",
      "If you are working in the cold, dress appropriately and take warming breaks. Change wet clothes frequently, especially shoes, boots, and socks.",
      "If you are working in the heat, take cooling breaks and stay well hydrated.",
    ],
  },
];

export const CITIZEN_ACTIONS: Group[] = [
  {
    title: "Responsible Waste Disposal and Drain Maintenance",
    items: [
      "Avoid dumping plastic waste, household garbage, construction debris and other materials into roadside drains, stormwater channels and water bodies.",
      "Ensure proper segregation and disposal of solid waste to prevent drainage blockages during heavy rainfall.",
      "Participate in neighbourhood cleanliness drives and report clogged drains to the concerned municipal authorities.",
    ],
  },
  {
    title: "Promote Rainwater Harvesting",
    items: [
      "Install rooftop rainwater harvesting systems to collect and store rainwater or facilitate groundwater recharge.",
      "Regularly maintain rainwater harvesting structures to ensure their effectiveness during the monsoon season.",
      "Encourage residential societies, schools and commercial establishments to adopt rainwater harvesting practices.",
    ],
  },
  {
    title: "Increase Green Spaces and Permeable Surfaces",
    items: [
      "Prefer permeable materials in residential pathways, parking spaces and open areas instead of completely covering surfaces with concrete.",
      "Maintain gardens, lawns and green spaces to improve natural rainwater infiltration.",
      "Plant and maintain trees and vegetation to support urban green infrastructure and reduce surface runoff.",
    ],
  },
  {
    title: "Protect Lakes, Wetlands and Natural Drainage Channels",
    items: [
      "Avoid dumping waste and wastewater into nearby lakes, ponds and natural drainage channels.",
      "Report illegal encroachments, waste disposal and activities that obstruct natural water flow to municipal authorities.",
      "Participate in community initiatives aimed at protecting and restoring local water bodies.",
    ],
  },
  {
    title: "Strengthen Community Participation and Awareness",
    items: [
      "Participate in local flood-awareness campaigns and community-based disaster preparedness programmes.",
      "Work with resident welfare associations (RWAs) to identify frequently waterlogged locations, blocked drains and vulnerable neighbourhoods.",
      "Share verified rainfall warnings, flood alerts and emergency information with neighbours, particularly elderly people, children and persons with disabilities.",
    ],
  },
  {
    title: "Household-Level Flood Preparedness",
    items: [
      "Identify whether your residential area is located in a low-lying or flood-prone zone.",
      "Prepare a household emergency plan, including evacuation routes, emergency contacts and safe locations.",
      "Keep essential medicines, drinking water, first-aid supplies, flashlights and important documents in an easily accessible, waterproof emergency kit.",
      "Cooperate with local authorities and follow official evacuation instructions during extreme rainfall and flooding events.",
    ],
  },
];

export const GOVERNMENT_ACTIONS: Group[] = [
  {
    title: "Zone Low Pockets as Engineered Retention Space, Not Just Pumping Targets",
    items: [
      "Formally mark low-lying pockets such as Bopal in the Development Plan as detention zones — dual-purpose neighbourhood parks that hold water for 24–48 hours and drain slowly, rather than fighting gravity with pumps after the fact.",
      "AMC's emergency response — excavating a trench and diverting flow into Ghuma Lake — should become the standing template at every identified low pocket, engineered in advance rather than dug mid-crisis.",
    ],
  },
  {
    title: "Stop the Lake Encroachment and Establish a Transparent Capacity Check on the River",
    items: [
      "Legally protect and satellite-monitor the approximately 122 remaining lakes against further encroachment, prioritising the dozen or so with the highest retention volume.",
      "On the riverfront, commission and publish an updated hydraulic carrying-capacity study against current upstream dam-release patterns and rainfall, repeated periodically rather than assumed settled.",
    ],
  },
  {
    title: "Make Drainage a Precondition of Annexation, Not an Afterthought",
    items: [
      "Before any new Town Planning scheme in an annexed area is finalised, minimum trunk stormwater capacity should be a sanctioned line item, funded through betterment charges on that specific corridor rather than waiting for the general capital cycle.",
      "The already-announced ₹900 crore peripheral works package and the ADB loan should run to a published, fixed completion date.",
    ],
  },
  {
    title: "Turn Rainwater Harvesting into an Ongoing Audit, Not a One-Time Box-Tick",
    items: [
      "Tie rainwater harvesting (RWH) compliance checks to property tax renewal, the way fire-safety NOCs already work, instead of a single check at occupancy.",
      "Extend permeable-surface requirements to AMC's own footpaths, parking lots and road medians — public hardscape is a growing share of the impervious surface too, and it is the share AMC controls directly.",
    ],
  },
  {
    title: "Finish What Is Funded, and Finish Automating the Pumps",
    items: [
      "Put a hard, published deadline on pre-monsoon works — before April, not “underway” through July — with geotagged public progress tracking.",
      "Fast-track the SCADA rollout already funded under the World Bank project: automated, centrally monitored pumps respond in minutes rather than hours.",
      "In the old core, sequence storm-sewer separation into whatever road or utility digging is already planned there to piggyback the cost, and install non-return valves at known backflow points in the meantime.",
    ],
  },
  {
    title: "Design to Today's Rainfall, and Be Honest About What “Fixed” Means",
    items: [
      "Re-base drainage design standards on recent cloudburst-pattern data rather than older long-run averages alone.",
      "Set public expectations around faster recovery and fewer repeat-flood spots — not zero waterlogging in a genuine extreme event.",
      "Direct budget towards decentralised, redundant retention at neighbourhood scale, rather than only ever-larger centralised pipes and pumps, which have physical limits.",
    ],
  },
];

export const REFERENCES = [
  {
    text: "Ahmedabad Climate Resilient City Action Plan (2023). Towards a Net Zero Future.",
    url: "https://www.cities-and-regions.org/wp-content/uploads/2023-ahmedabad-climate-resilient-city-action-plan-compressed.pdf",
  },
  {
    text: "Ahmedabad Flood Risk Report (July 2026). Root-Cause Analysis & Reasonably Practicable Remedies.",
    url: "https://www.academia.edu/170958347/Ahmedabad_Flood_Risk_Report",
  },
];
