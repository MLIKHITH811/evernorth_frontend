import { useState, useEffect } from 'react';
import { HealthInfo } from '../../types/types';
import { Heart, Plus, X, AlertCircle, Search } from 'lucide-react';

interface Props {
  healthInfo: HealthInfo;
  onChange: (healthInfo: HealthInfo) => void;
}

const commonConditions = [
  "Asthma", "Diabetes", "Hypertension", "Cancer", "Heart Disease", "Stroke", "Chronic Obstructive Pulmonary Disease (COPD)",
"Alzheimer's Disease", "Parkinson's Disease", "Epilepsy", "Arthritis", "Osteoporosis", "Multiple Sclerosis", "Cystic Fibrosis", "Tuberculosis",
"HIV/AIDS", "Hepatitis", "Flu", "Pneumonia", "Bronchitis", "Anemia", "Influenza", "Autism Spectrum Disorder",
"Down Syndrome", "Schizophrenia", "Bipolar Disorder", "Depression", "Anxiety Disorders", "Obsessive-Compulsive Disorder (OCD)", "Post-Traumatic Stress Disorder (PTSD)", "Eating Disorders",
"Attention-Deficit Hyperactivity Disorder (ADHD)", "Dementia", "Insomnia", "Sleep Apnea", "Chronic Fatigue Syndrome", "Migraines", "Headaches", "Sinusitis",
"Gastroesophageal Reflux Disease (GERD)", "Irritable Bowel Syndrome (IBS)", "Crohn's Disease", "Ulcerative Colitis", "Celiac Disease", "Liver Disease", "Kidney Disease", "Gallstones",
"Urinary Tract Infections (UTI)", "Prostate Disease", "Menopause", "Pregnancy", "Menstrual Disorders", "Infertility", "Polycystic Ovary Syndrome (PCOS)", "Endometriosis",
"Thyroid Disorders", "Hyperthyroidism", "Hypothyroidism", "Chronic Kidney Disease", "Chronic Pain", "Lupus", "Sickle Cell Disease", "Hemophilia",
"Blood Clots", "Deep Vein Thrombosis (DVT)", "Varicose Veins", "Obesity", "Underweight", "Malnutrition", "Dehydration", "Vitamin Deficiencies",
"Iron Deficiency", "Hypoglycemia", "Hyperglycemia", "Rheumatoid Arthritis", "Psoriasis", "Eczema", "Acne", "Rosacea",
"Vitiligo", "Hives", "Skin Cancer", "Melanoma", "Basal Cell Carcinoma", "Squamous Cell Carcinoma", "Psoriatic Arthritis", "Chronic Sinusitis",
"Allergies", "Food Allergies", "Drug Allergies", "Environmental Allergies", "Pollen Allergies", "Dust Mite Allergies", "Pet Allergies", "Latex Allergies",
"Bee Stings", "Insect Stings", "Animal Dander", "Asthma Attacks", "Panic Attacks", "Cerebral Palsy", "Spina Bifida", "Hydrocephalus",
"Muscular Dystrophy", "Amyotrophic Lateral Sclerosis (ALS)", "Chronic Migraines", "Tinnitus", "Cataracts", "Glaucoma", "Macular Degeneration", "Retinal Detachment",
"Myopia", "Hyperopia", "Astigmatism", "Presbyopia", "Strabismus", "Dry Eye Syndrome", "Conjunctivitis", "Pink Eye",
"Eye Infections", "Vision Loss", "Hearing Loss", "Osteoarthritis", "Gout", "Liver Cirrhosis", "Fatty Liver Disease", "Cirrhosis",
"Jaundice", "Hepatitis C", "Hepatitis B", "Hepatitis A", "Liver Failure", "Gallbladder Disease", "Pancreatitis", "Pancreatic Cancer",
"Kidney Stones", "Nephrotic Syndrome", "Bladder Cancer", "Bladder Infections", "Urinary Retention", "Chronic Urinary Incontinence", "Sexually Transmitted Infections (STIs)", "Chlamydia",
"Gonorrhea", "Syphilis", "Herpes", "HPV", "Trichomoniasis", "Chronic Fatigue Syndrome", "Fibromyalgia", "Tendonitis",
"Tennis Elbow", "Carpal Tunnel Syndrome", "Bursitis", "Pelvic Inflammatory Disease", "Cervical Cancer", "Uterine Cancer", "Ovarian Cancer", "Endometrial Cancer",
"Testicular Cancer", "Prostate Cancer", "Breast Cancer", "Lung Cancer", "Leukemia", "Lymphoma", "Multiple Myeloma", "Colon Cancer",
"Brain Cancer", "Thyroid Cancer", "Cancer in Children", "Cancer in Teenagers", "Bone Cancer", "Lung Disease", "Sarcoidosis", "Wheat Gluten Sensitivity",
"Food Sensitivities", "Eosinophilic Esophagitis", "Chronic Gastritis", "Pancreatic Insufficiency", "Gastrointestinal Bleeding", "Gallbladder Cancer", "Chronic Lymphocytic Leukemia", "Hypokalemia",
"Hyperkalemia", "Hypernatremia", "Hyponatremia", "Hypercalcemia", "Hypocalcemia", "Hypermagnesemia", "Hypomagnesemia", "Hyperparathyroidism",
"Hypoparathyroidism", "Hyperaldosteronism", "Addison's Disease", "Cushing's Syndrome", "Hypocortisolism", "Hyperpituitarism", "Hypopituitarism", "Pituitary Tumors",
"Multiple Endocrine Neoplasia", "Polycystic Kidney Disease", "Alport Syndrome", "Hypertrophic Cardiomyopathy", "Mitral Valve Prolapse", "Coronary Artery Disease", "Heart Failure", "Arrhythmia",
"Atrial Fibrillation", "Myocardial Infarction (Heart Attack)", "Angina", "Endocarditis", "Pericarditis", "Cardiac Arrest", "Aortic Aneurysm", "Stroke",
"Ischemic Stroke", "Hemorrhagic Stroke", "Transient Ischemic Attack (TIA)", "Acute Coronary Syndrome", "Heart Murmur", "Pulmonary Embolism", "Deep Vein Thrombosis", "Peripheral Artery Disease",
"Arteriosclerosis", "Coronary Artery Spasm", "Congenital Heart Disease", "Patent Ductus Arteriosus", "Atrial Septal Defect", "Ventricular Septal Defect", "Cardiac Arrhythmias", "Cardiomyopathy",
"Heart Valve Disease", "Hepatic Encephalopathy", "Amyloidosis", "Hyperlipidemia", "Tonsillitis", "Nasal Polyps", "Ear Infections", "Otitis Media",
"Chronic Ear Infections", "Vertigo", "Dizziness", "Labyrinthitis", "Meniere's Disease", "Iron Deficiency", "Vitamin B12 Deficiency", "Folate Deficiency",
"Sickle Cell Anemia", "Thalassemia", "Aplastic Anemia", "Polycythemia Vera", "Hemochromatosis", "Hemolytic Anemia", "Pernicious Anemia", "Sideroblastic Anemia",
"Anemia of Chronic Disease", "Guillain-Barré Syndrome", "Chronic Pain Syndrome", "Ankylosing Spondylitis", "Ehlers-Danlos Syndrome", "Sjögren's Syndrome", "Polymyalgia Rheumatica", "Fibromyalgia",
"Scleroderma", "Vasculitis", "Dermatomyositis", "Polymyositis", "Reactive Arthritis", "Osteopenia", "Spondylitis", "Duchenne Muscular Dystrophy",
"Becker Muscular Dystrophy", "Facioscapulohumeral Dystrophy", "Congenital Muscular Dystrophy", "Myotonic Dystrophy", "Spinal Muscular Atrophy", "Rotator Cuff Injury", "Bursitis", "Chronic Fatigue Syndrome",
"Migraine", "Shingles", "Mental Health Disorders", "Addiction", "Substance Abuse", "Phobias", "Sleep Disorders", "Narcolepsy",
"Hypersomnia", "Restless Leg Syndrome", "Parasomnia", "Hoarding Disorder", "Depersonalization Disorder", "Tardive Dyskinesia", "Dystonia", "Tourette Syndrome",
"Neurofibromatosis", "Trigeminal Neuralgia", "Lyme Disease", "Chronic Lyme Disease", "Tick-Borne Illnesses", "West Nile Virus", "Zika Virus", "Ebola",
"Hantavirus", "Plague", "Leprosy", "Anthrax", "Dengue Fever", "Chikungunya", "Malaria", "Tetanus",
"Typhoid", "Cholera", "Diptheria", "Mumps", "Measles", "Chickenpox", "Whooping Cough", "Rubella",
"Polio", "Smallpox", "Hantavirus", "Mad Cow Disease", "Avian Influenza", "SARS", "Bird Flu", "Swine Flu",
"Norovirus", "Rotavirus", "Common Cold", "COVID-19", "SARS-CoV-2", "Monkeypox", "Rhinovirus", "Enterovirus",
"RSV", "Hand, Foot and Mouth Disease", "Immunodeficiency Diseases", "Primary Immunodeficiency", "Acquired Immunodeficiency Syndrome"
  ];
  
  const commonAllergies = [
    "Peanuts", "Tree Nuts", "Milk", "Eggs", "Soy", "Wheat", "Fish", "Shellfish", "Dust", "Pollen", "Latex", "Insect Stings", "Penicillin", 
    "Aspirin", "Ibuprofen", "Sulfa Drugs", "Eggplant", "Tomatoes", "Citrus Fruits", "Chocolate", "Gluten", "Sesame Seeds", "Dairy Products",
    "Perfumes/Cosmetics", "Animal Dander (Cats, Dogs)", "Mold", "Cigarette Smoke", "Pollens (Grass, Ragweed)", "Sun Exposure (Sunburns)",
    "Food Additives (MSG, Sulfites)", "Nickel (Metal Allergies)", "Medicines (Aspirin, Ibuprofen)", "Latex Gloves", "Wool", "Pollen from Trees",
    "Pollen from Grasses", "Pollen from Weeds", "Ragweed Pollen", "Birch Tree Pollen", "Cedar Tree Pollen", "Dust Mites", "Cockroach Allergy", 
    "Animal Saliva (Dogs, Cats)", "Bee Stings", "Wasp Stings", "Fire Ant Stings", "Flea Bites", "Mosquito Bites", "Cockroach Droppings", 
    "Poison Ivy", "Poison Oak", "Poison Sumac", "Synthetic Fabrics (e.g., polyester)", "Wool Clothing", "Metal Jewelry (e.g., nickel)", 
    "Gold Allergy", "Silver Allergy", "Copper Allergy", "Formaldehyde", "Fragrance in Cosmetics", "Chlorine (in swimming pools)",
    "Sunlight (photosensitivity)", "Wind (allergy-induced)", "Mold Spores", "Tree Bark", "Pet Hair", "Feather Pillows", "Dust from Carpets",
    "Laundry Detergents", "Fabric Softeners", "Hair Dyes", "Food Coloring (e.g., Red 40)", "Artificial Sweeteners", "Salt", 
    "MSG (Monosodium Glutamate)", "Sulfites (in wine and dried fruits)", "Benzoates (preservatives)", "Nitrates in Processed Meats",
    "Aspartame", "Artificial Colors (Yellow 5, Red 40)", "Caffeine", "Histamine (found in aged foods)", "Tannins (found in wine)", 
    "Gelatin (found in marshmallows, gummy candies)", "Latex Balloons", "Rubber Bands", "Band-Aids (adhesives)", "Adhesive Tapes",
    "Mold in Bathroom", "Car Exhaust Fumes", "Industrial Fumes", "Air Pollution", "Soot", "Gasoline Fumes", "Chemical Cleaning Products", 
    "Floor Wax", "Carpet Cleaner", "Paint Fumes", "Solvents (e.g., acetone)", "Pesticides", "Herbicides", "Anti-freeze", "Nail Polish",
    "Nail Polish Remover (acetone)", "Shaving Cream", "Deodorants", "Hair Spray", "Bug Spray", "Insect Repellent", "Antifungal Cream",
    "Alcohol in Skin Products", "Toothpaste Ingredients", "Detergents (laundry and dish)", "Disinfectants", "Perfumes", "Aftershave",
    "Sunblock", "Sunscreen Ingredients (oxybenzone)", "Skin Care Products", "Acne Treatments", "Hair Removal Creams", "Facial Scrubs", 
    "Body Lotions", "Soap Fragrances", "Flavored Lip Balms", "Gum", "Tooth Whitening Products", "Lipstick", "Lip Gloss", 
    "Foundation Makeup", "Concealers", "Mascara", "Eyeliner", "Eye Shadow", "Blush", "Hair Dye", "Henna", "Metal Fillings in Teeth", 
    "Tattoos (dye allergies)", "Eyewear Materials (e.g., plastic, rubber)", "Contact Lenses", "Cotton", "Linen", "Silk", "Hemp",
    "Spandex", "Nylon", "Acrylic Fabrics", "Polyester", "Rayon", "PVC (Plastic)", "Leather", "Animal Fur (e.g., mink, rabbit)",
    "Rubber Flooring", "Asphalt", "Tar", "Charcoal (grilled food)", "Wood Smoke", "Exhaust from Boilers", "Coal Dust", "Sand",
    "Concrete Dust", "Ammonia", "Chlorine Bleach", "Acetone", "Benzene", "Toluene", "Carbon Monoxide", "Ammonium Hydroxide", 
    "Silica Dust", "Formaldehyde (building materials)", "Styrene", "Nitrogen Dioxide", "Sulfur Dioxide", "Pesticide Residue",
    "Herbicide Residue", "Farm Animal Dander", "Bird Droppings", "Barn Dust", "Plant Pollens", "Tree Sap", "Straw", "Grass Clippings",
    "Hay", "Wood Shavings", "Fungal Spores", "Tree Sap", "Moss", "Cedar Wood Dust", "Paper Dust", "Magazine Ink", "Newspaper Ink",
    "Leather Goods", "Plant Oils (e.g., lavender, eucalyptus)", "Essential Oils (e.g., tea tree, peppermint)", 
    "Facial Masks (clay, mud)", "Hair Removal Wax", "Bath Salts", "Body Scrubs", "Hand Sanitizers", "Vitamin C (topical)",
    "Antioxidants (in skincare)", "Soy Protein", "Pea Protein", "Tofu", "Tempeh", "Vegan Meat Substitutes", "Caviar", "Truffles",
    "Seaweed", "Sea Cucumber", "Oysters", "Mussels", "Squid", "Octopus", "Eel", "Anchovies", "Sardines", "Tuna", "Salmon", "Cod",
    "Halibut", "Haddock", "Mackerel", "Tilapia", "Shellfish (Lobster, Crab)", "Prawns", "Shrimp", "Scallops", "Clams", "Abalone", 
    "Laver (seaweed)", "Kelp", "Miso", "Soy Sauce", "Tofu Products", "Yogurt", "Cheese", "Ice Cream", "Butter", "Milk Chocolate",
    "Dark Chocolate", "White Chocolate", "Chocolate Ice Cream", "Chocolate Bars", "Marshmallows", "Gummy Candies", "Fruit Juices", 
    "Canned Vegetables", "Canned Meat", "Canned Fish", "Processed Meats", "Red Meat", "Poultry", "Ham", "Bacon", "Sausages", 
    "Hot Dogs", "Salami", "Pepperoni", "Pepper", "Paprika", "Curry", "Chili Peppers", "Mustard", "Ketchup", "Mayonnaise", 
    "Soy Sauce", "Vinegar", "Olive Oil", "Coconut Oil", "Palm Oil", "Sesame Oil", "Canola Oil", "Vegetable Oils", "Animal Fats",
     "Fish Oil", "Cod Liver Oil", "Flaxseed Oil", "Hemp Oil", "Sunflower Oil", "Corn Oil", "Cottonseed Oil", "Ghee", "Lard", "Tallow",
    "Sugar", "Refined Sugar", "Brown Sugar", "Honey", "Maple Syrup", "Agave", "Molasses", "Stevia", "Xylitol", "Aspartame", "Saccharin",
    "Sucralose", "High Fructose Corn Syrup", "Fruit Juice Concentrates", "Artificial Sweeteners", "Soft Drinks", "Energy Drinks", "Alcohol", 
    "Beer", "Wine", "Spirits", "Whiskey", "Vodka", "Rum", "Tequila", "Cider", "Lemonade", "Iced Tea", "Hot Tea", "Coffee", 
    "Milk Alternatives (e.g., almond, oat, coconut milk)", "Coffee Creamers", "Non-Dairy Yogurt", "Non-Dairy Cheese", "Non-Dairy Ice Cream", 
    "Almonds", "Walnuts", "Cashews", "Pecans", "Hazelnuts", "Pistachios", "Macadamia Nuts", "Brazil Nuts", "Pine Nuts", "Chestnuts", "Filberts", 
    "Coconut", "Cacao", "Carob", "Chia Seeds", "Flax Seeds", "Sunflower Seeds", "Pumpkin Seeds", "Sesame Seeds", "Hemp Seeds", "Poppy Seeds", 
    "Quinoa", "Rice", "Barley", "Rye", "Buckwheat", "Oats", "Amaranth", "Millet", "Sorghum", "Spelt", "Teff", "Bulgur", "Couscous", "Tapioca", 
    "Polenta", "Sweet Potatoes", "Yams", "Carrots", "Beets", "Cucumbers", "Zucchini", "Bell Peppers", "Lettuce", "Spinach", "Kale", "Chard", 
    "Arugula", "Broccoli", "Cauliflower", "Brussels Sprouts", "Cabbage", "Celery", "Tomatoes", "Avocados", "Cucumbers", "Pumpkins", "Squash", 
    "Radishes", "Green Beans", "Asparagus", "Peas", "Mushrooms", "Leeks", "Onions", "Garlic", "Shallots", "Chives", "Ginger", "Turmeric", "Basil", 
    "Oregano", "Thyme", "Parsley", "Sage", "Rosemary", "Mint", "Dill", "Cilantro", "Tarragon", "Chili Peppers", "Curry Leaves", "Lavender", "Curry", 
    "Cumin", "Fennel Seeds", "Cardamom", "Cinnamon", "Nutmeg", "Cloves", "Black Pepper", "Saffron", "Allspice", "Vanilla", "Chocolate Chips", 
    "Caramel", "Marzipan", "Candy Corn", "Fruit Snacks", "Fruit Leather", "Gummy Bears", "Jelly Beans", "Lollipops", "Hard Candy", "Taffy", 
    "Licorice", "Cotton Candy", "Candy Canes", "Pecan Pie", "Apple Pie", "Lemon Meringue Pie", "Pumpkin Pie", "Cheesecake", "Chocolate Cake", 
    "Cupcakes", "Brownies", "Cookies", "Ice Cream Cake", "Tarts", "Pastries", "Doughnuts", "Muffins", "Croissants", "Bagels", "Buns", "Biscuits", 
    "Scones", "Waffles", "Pancakes", "Toast", "Croissants", "Cinnamon Rolls", "Granola Bars", "Breakfast Cereals", "Instant Oatmeal", "Energy Bars", 
    "Protein Bars", "Tapioca Pudding", "Chia Pudding", "Rice Pudding", "Jell-O", "Custard", "Pudding", "Gelatin Desserts", "Fruit Cups", "Sherbet", 
    "Frozen Yogurt", "Non-Dairy Frozen Dessert", "Smoothies", "Milkshakes", "Fruit Juices", "Coconut Water", "Sports Drinks", "Vitamin Water", 
    "Coconut Milk", "Soy Milk", "Almond Milk", "Oat Milk", "Rice Milk"
  ];
export default function HealthSection({ healthInfo, onChange }: Props) {
  const [newCondition, setNewCondition] = useState('');
  const [newAllergy, setNewAllergy] = useState('');
  const [conditionSuggestions, setConditionSuggestions] = useState<string[]>([]);
  const [allergySuggestions, setAllergySuggestions] = useState<string[]>([]);
  const [showConditionDescription, setShowConditionDescription] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState('');
  const [conditionDescription, setConditionDescription] = useState('');
  const [showAllergyRemovePopup, setShowAllergyRemovePopup] = useState(false);
  const [allergyToRemove, setAllergyToRemove] = useState<number | null>(null);
  const [conditionToRemove, setConditionToRemove] = useState<number | null>(null);

  useEffect(() => {
    if (newCondition.length >= 3) {
      setConditionSuggestions(
        commonConditions.filter(condition =>
          condition.toLowerCase().includes(newCondition.toLowerCase())
        )
      );
    } else {
      setConditionSuggestions([]);
    }
  }, [newCondition]);

  useEffect(() => {
    if (newAllergy.length >= 3) {
      setAllergySuggestions(
        commonAllergies.filter(allergy =>
          allergy.toLowerCase().includes(newAllergy.toLowerCase())
        )
      );
    } else {
      setAllergySuggestions([]);
    }
  }, [newAllergy]);

  const handleAddCondition = (condition: string) => {
    if (!condition.trim()) return;
    setSelectedCondition(condition.trim());
    setShowConditionDescription(true);
    setNewCondition('');
  };

  const handleAddConditionWithDescription = () => {
    const condition = selectedCondition;
    onChange({
      ...healthInfo,
      conditions: [...healthInfo.conditions, condition],
      descriptions: {
        ...healthInfo.descriptions,
        [condition]: conditionDescription
      }
    });
    setShowConditionDescription(false);
    setSelectedCondition('');
    setConditionDescription('');
  };

  const handleAddAllergy = (allergy: string) => {
    if (!allergy.trim()) return;
    onChange({
      ...healthInfo,
      allergies: [...healthInfo.allergies, allergy.trim()],
    });
    setNewAllergy('');
  };

  const handleRemoveCondition = (index: number) => {
    const condition = healthInfo.conditions[index];
    const { [condition]: _, ...restDescriptions } = healthInfo.descriptions;
    onChange({
      ...healthInfo,
      conditions: healthInfo.conditions.filter((_, i) => i !== index),
      descriptions: restDescriptions
    });
  };

  const handleRemoveAllergy = (index: number) => {
    onChange({
      ...healthInfo,
      allergies: healthInfo.allergies.filter((_, i) => i !== index),
    });
  };
  const handleConfirmRemoveAllergy = (index: number) => {
    setShowAllergyRemovePopup(true);
    setAllergyToRemove(index);
  };
  
  const confirmRemoveAllergy = () => {
    if (allergyToRemove !== null) {
      handleRemoveAllergy(allergyToRemove);
      setAllergyToRemove(null);
    }
    setShowAllergyRemovePopup(false);
  };
  const confirmRemoveCondition = (index: number) => {
    setConditionToRemove(index);
  };
  
  const cancelRemoveCondition = () => {
    setConditionToRemove(null);
  };
  
  const handleRemoveConfirmedCondition = () => {
    if (conditionToRemove !== null) {
      const condition = healthInfo.conditions[conditionToRemove];
      const { [condition]: _, ...restDescriptions } = healthInfo.descriptions;
      onChange({
        ...healthInfo,
        conditions: healthInfo.conditions.filter((_, i) => i !== conditionToRemove),
        descriptions: restDescriptions,
      });
      setConditionToRemove(null);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center mb-8">
        <Heart className="h-8 w-8 text-red-500 mr-3" />
        <h2 className="text-2xl font-semibold text-gray-900">
          Health Information
        </h2>
      </div>

      <div className="max-w-3xl space-y-8">
        {/* Health Conditions */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-6">
            Health Conditions
          </h3>
          <div className="space-y-6">
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 shadow-sm py-3 pl-10 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search or enter health condition"
                />
                {newCondition && (
                  <button
                    onClick={() => handleAddCondition(newCondition)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Condition Suggestions */}
              {conditionSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-lg border border-gray-200 max-h-48 overflow-y-auto">
                  {conditionSuggestions.map((condition, index) => (
                    <button
                      key={index}
                      onClick={() => handleAddCondition(condition)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                    >
                      {condition}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Existing Conditions */}
            <div className="flex flex-wrap gap-2">
            {healthInfo.conditions.map((condition, index) => (
    <div
      key={index}
      className="group relative inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200"
    >
      {condition}
      {healthInfo.descriptions[condition] && (
        <AlertCircle className="h-4 w-4 ml-1 text-blue-600" />
      )}
      <button
        onClick={() => confirmRemoveCondition(index)}
        className="ml-2 text-blue-600 hover:text-blue-800"
      >
        <X className="h-4 w-4" />
      </button>
      
      {/* Description Tooltip */}
      {healthInfo.descriptions[condition] && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
          {healthInfo.descriptions[condition]}
        </div>
      )}
    </div>
  ))}
            </div>
          </div>
        </div>


        {/* Confirmation Modal for Removing Condition */}
{conditionToRemove !== null && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full">
      <h4 className="text-lg font-medium mb-4">Confirm Removal</h4>
      <p className="mb-4">
        Are you sure you want to remove the condition{' '}
        <span className="font-semibold">
          {healthInfo.conditions[conditionToRemove]}
        </span>
        ?
      </p>
      <div className="flex justify-end space-x-3">
        <button
          onClick={cancelRemoveCondition}
          className="px-4 py-2 text-gray-700 hover:text-gray-900"
        >
          Cancel
        </button>
        <button
          onClick={handleRemoveConfirmedCondition}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
)}

        {/* Allergies */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Allergies</h3>
          <div className="space-y-6">
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 shadow-sm py-3 pl-10 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search or enter allergy"
                />
                {newAllergy && (
                  <button
                    onClick={() => handleAddAllergy(newAllergy)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Allergy Suggestions */}
              {allergySuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-lg border border-gray-200 max-h-48 overflow-y-auto">
                  {allergySuggestions.map((allergy, index) => (
                    <button
                      key={index}
                      onClick={() => handleAddAllergy(allergy)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                    >
                      {allergy}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Existing Allergies */}
            <div className="flex flex-wrap gap-2">
            {healthInfo.allergies.map((allergy, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-700 border border-red-200"
                >
                  {allergy}
                  <button
                    onClick={() => handleConfirmRemoveAllergy(index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}

            </div>
          </div>
        </div>
      </div>


      {showAllergyRemovePopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full">
      <h4 className="text-lg font-medium mb-4">
        Are you sure you want to remove this allergy?
      </h4>
      <div className="flex justify-end space-x-3 mt-4">
        <button
          onClick={() => setShowAllergyRemovePopup(false)}
          className="px-4 py-2 text-gray-700 hover:text-gray-900"
        >
          Cancel
        </button>
        <button
          onClick={confirmRemoveAllergy}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          OK
        </button>
      </div>
    </div>
  </div>
)}


      {/* Condition Description Modal */}
      {showConditionDescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h4 className="text-lg font-medium mb-4">
              Add details for {selectedCondition}
            </h4>
            <textarea
              className="w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              value={conditionDescription}
              onChange={(e) => setConditionDescription(e.target.value)}
              placeholder="Add any specific details about this condition..."
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowConditionDescription(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleAddConditionWithDescription}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {conditionDescription ? 'Add with Details' : 'Add Without Details'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
