const verses = [
  { text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", reference: "Jeremiah 29:11", theme: "Hope" },
  { text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.", reference: "Isaiah 40:31", theme: "Hope" },
  { text: "May the God of hope fill you with all joy and peace as you trust in him.", reference: "Romans 15:13", theme: "Hope" },
  { text: "I can do all things through Christ who strengthens me.", reference: "Philippians 4:13", theme: "Strength" },
  { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", reference: "Joshua 1:9", theme: "Strength" },
  { text: "The Lord is my strength and my shield; my heart trusts in him, and he helps me.", reference: "Psalm 28:7", theme: "Strength" },
  { text: "The joy of the Lord is your strength.", reference: "Nehemiah 8:10", theme: "Strength" },
  { text: "The Lord is my shepherd; I shall not want.", reference: "Psalm 23:1", theme: "Peace" },
  { text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", reference: "Philippians 4:6", theme: "Peace" },
  { text: "The peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.", reference: "Philippians 4:7", theme: "Peace" },
  { text: "Come to me, all you who are weary and burdened, and I will give you rest.", reference: "Matthew 11:28", theme: "Peace" },
  { text: "Cast all your anxiety on him because he cares for you.", reference: "1 Peter 5:7", theme: "Peace" },
  { text: "Trust in the Lord with all your heart and lean not on your own understanding.", reference: "Proverbs 3:5-6", theme: "Trust" },
  { text: "And we know that in all things God works for the good of those who love him.", reference: "Romans 8:28", theme: "Faith" },
  { text: "With God all things are possible.", reference: "Matthew 19:26", theme: "Faith" },
  { text: "For nothing will be impossible with God.", reference: "Luke 1:37", theme: "Faith" },
  { text: "Now faith is confidence in what we hope for and assurance about what we do not see.", reference: "Hebrews 11:1", theme: "Faith" },
  { text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", reference: "John 3:16", theme: "Love" },
  { text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.", reference: "1 Corinthians 13:4", theme: "Love" },
  { text: "We love because he first loved us.", reference: "1 John 4:19", theme: "Love" },
  { text: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.", reference: "Ephesians 4:32", theme: "Love" },
  { text: "Above all, love each other deeply, because love covers over a multitude of sins.", reference: "1 Peter 4:8", theme: "Love" },
  { text: "The Lord is my light and my salvation — whom shall I fear?", reference: "Psalm 27:1", theme: "Courage" },
  { text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.", reference: "2 Timothy 1:7", theme: "Courage" },
  { text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me.", reference: "Psalm 23:4", theme: "Comfort" },
  { text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.", reference: "Psalm 34:18", theme: "Comfort" },
  { text: "He heals the brokenhearted and binds up their wounds.", reference: "Psalm 147:3", theme: "Comfort" },
  { text: "Your word is a lamp for my feet, a light on my path.", reference: "Psalm 119:105", theme: "Guidance" },
  { text: "Whether you turn to the right or to the left, your ears will hear a voice behind you, saying, This is the way; walk in it.", reference: "Isaiah 30:21", theme: "Guidance" },
  { text: "Be joyful always; pray continually; give thanks in all circumstances.", reference: "1 Thessalonians 5:16-18", theme: "Joy" },
  { text: "Delight yourself in the Lord, and he will give you the desires of your heart.", reference: "Psalm 37:4", theme: "Joy" },
  { text: "This is the day the Lord has made; let us rejoice and be glad in it.", reference: "Psalm 118:24", theme: "Joy" },
  { text: "Give thanks to the Lord, for he is good; his love endures forever.", reference: "Psalm 107:1", theme: "Gratitude" },
  { text: "God is our refuge and strength, an ever-present help in trouble.", reference: "Psalm 46:1", theme: "Protection" },
  { text: "The name of the Lord is a fortified tower; the righteous run to it and are safe.", reference: "Proverbs 18:10", theme: "Protection" },
  { text: "And my God will meet all your needs according to the riches of his glory in Christ Jesus.", reference: "Philippians 4:19", theme: "Provision" },
  { text: "Seek first his kingdom and his righteousness, and all these things will be given to you as well.", reference: "Matthew 6:33", theme: "Provision" },
  { text: "I praise you because I am fearfully and wonderfully made.", reference: "Psalm 139:14", theme: "Identity" },
  { text: "For we are God's handiwork, created in Christ Jesus to do good works.", reference: "Ephesians 2:10", theme: "Purpose" },
  { text: "Let your light shine before others, that they may see your good deeds and glorify your Father in heaven.", reference: "Matthew 5:16", theme: "Purpose" },
  { text: "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you.", reference: "Numbers 6:24-25", theme: "Blessing" },
  { text: "Blessed is the one who trusts in the Lord, whose confidence is in him.", reference: "Jeremiah 17:7", theme: "Blessing" },
  { text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault.", reference: "James 1:5", theme: "Wisdom" },
  { text: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.", reference: "Galatians 6:9", theme: "Perseverance" },
  { text: "I have fought the good fight, I have finished the race, I have kept the faith.", reference: "2 Timothy 4:7", theme: "Perseverance" },
  { text: "Therefore, if anyone is in Christ, the new creation has come: the old has gone, the new is here!", reference: "2 Corinthians 5:17", theme: "New Beginnings" },
  { text: "His compassions never fail. They are new every morning; great is your faithfulness.", reference: "Lamentations 3:22-23", theme: "New Beginnings" },
  { text: "Praise the Lord, my soul; all my inmost being, praise his holy name.", reference: "Psalm 103:1", theme: "Praise" },
  { text: "Let everything that has breath praise the Lord.", reference: "Psalm 150:6", theme: "Praise" },
  { text: "Give, and it will be given to you. A good measure, pressed down, shaken together and running over.", reference: "Luke 6:38", theme: "Generosity" },
];

export function getDailyVerse() {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const dayOfYear = Math.floor((Date.now() - start.getTime()) / 86400000);
  return verses[dayOfYear % verses.length];
}

export function getRandomVerse() {
  return verses[Math.floor(Math.random() * verses.length)];
}

export default verses;
