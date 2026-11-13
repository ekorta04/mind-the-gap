/* ===== CONTENT BANK (works offline; AI adds fresh items on top) ===== */
const BANK = {};

/* Use of English Part 3 — Word formation */
BANK.wf = [
  {s:"Experts warned that the current rate of spending was simply ___ in the long term.", stem:"SUSTAIN", a:["unsustainable"], why:"un- + sustain + -able. Negative meaning: it cannot continue."},
  {s:"Despite his ___ start to the season, the striker finished as top scorer.", stem:"PROMISE", a:["unpromising"], why:"Contrast with 'despite' → negative adjective: un- + promising."},
  {s:"The bridge was completed in ___ short time, surprising everyone.", stem:"REMARK", a:["remarkably"], why:"Adverb modifying the adjective 'short' → remarkably."},
  {s:"Clear communication is essential to avoid ___ between team members.", stem:"UNDERSTAND", a:["misunderstandings","misunderstanding"], why:"mis- + understanding. Plural is most natural here."},
  {s:"The manager's decision was widely seen as ___ and unfair.", stem:"JUSTIFY", a:["unjustified","unjustifiable"], why:"Negative adjective parallel to 'unfair'."},
  {s:"Many athletes struggle to accept the ___ of retirement.", stem:"INEVITABLE", a:["inevitability"], why:"Noun after 'the ... of' → inevitability."},
  {s:"The company's ___ to change eventually led to its collapse.", stem:"WILLING", a:["unwillingness"], why:"un- + willing + -ness. Noun after possessive."},
  {s:"The results were ___ better than we had anticipated.", stem:"CONSIDER", a:["considerably"], why:"Adverb + comparative: considerably better. Don't confuse with 'considerately' (amablemente)."},
  {s:"Investors were alarmed by the ___ of the market.", stem:"PREDICT", a:["unpredictability","volatility"], why:"Noun: un- + predict + -ability."},
  {s:"Regular feedback helps employees reach their full ___.", stem:"POTENT", a:["potential"], why:"Collocation: reach your full potential."},
  {s:"The referee's decision proved highly ___.", stem:"CONTROVERSY", a:["controversial"], why:"Adjective after 'proved highly'."},
  {s:"There has been a ___ increase in remote working since 2020.", stem:"SIGNIFY", a:["significant"], why:"Adjective before a noun."},
  {s:"The new software has ___ simplified the approval process.", stem:"DRAMA", a:["dramatically"], why:"Adverb modifying a verb."},
  {s:"Procrastination is often a sign of ___ rather than laziness.", stem:"PERFECT", a:["perfectionism"], why:"-ism: the tendency/belief. Perfectionist = the person."},
  {s:"The engineers carried out a thorough ___ of the risks.", stem:"ASSESS", a:["assessment"], why:"Noun after 'a thorough': assessment (double s twice!)."},
  {s:"Her ___ in the face of setbacks inspired the whole team.", stem:"RESILIENT", a:["resilience"], why:"Noun: resilient → resilience."},
  {s:"The policy had several ___ consequences that nobody had foreseen.", stem:"INTEND", a:["unintended"], why:"'nobody had foreseen' → negative: unintended."},
  {s:"She spoke with refreshing ___ about the challenges of leadership.", stem:"CANDID", a:["candour"], us:["candor"], why:"UK spelling: candour (-our). US: candor."},
  {s:"The team's ___ performance led to the coach's dismissal.", stem:"DISAPPOINT", a:["disappointing"], why:"-ing adjective describes the thing that causes the feeling."},
  {s:"Many start-ups fail because of poor financial ___.", stem:"PLAN", a:["planning"], why:"Double n: plan → planning."},
  {s:"It would be ___ to underestimate the importance of sleep.", stem:"WISE", a:["unwise"], why:"Negative adjective."},
  {s:"The CEO admitted that the targets had been ___ ambitious.", stem:"REAL", a:["unrealistically"], why:"un- + real + -istic + -ally. Adverb before an adjective."},
  {s:"His ___ approach to risk cost the firm millions.", stem:"CARE", a:["careless","carefree"], why:"Careless = sin cuidado (negative)."},
  {s:"The ___ of the new stadium has divided local residents.", stem:"CONSTRUCT", a:["construction"], why:"Noun: construction."},
  {s:"The plans were rejected on the grounds that they were ___ with safety regulations.", stem:"COMPLY", a:["non-compliant","noncompliant"], why:"non- + compliant. Compliance = noun."},
  {s:"The scheme was a resounding success, ___ all expectations.", stem:"EXCEED", a:["exceeding"], why:"Participle clause: exceeding all expectations."},
  {s:"Good leaders know how to delegate ___.", stem:"EFFECT", a:["effectively"], why:"Adverb modifying 'delegate'. Effect/affect trap!"},
  {s:"The two companies announced a ___ that would create a market leader.", stem:"MERGE", a:["merger"], why:"Noun: merger (fusión)."},
  {s:"The goalkeeper's ___ error gifted the visitors a late equaliser.", stem:"CHARACTER", a:["uncharacteristic"], why:"un- + character + -istic: not typical of him."},
  {s:"Self-discipline is often more important than natural ___.", stem:"ABLE", a:["ability"], why:"Noun: ability."},
  {s:"The minister's comments were described as deeply ___ by the opposition.", stem:"RESPONSIBLE", a:["irresponsible"], why:"ir- before r: irresponsible, irregular, irrelevant."},
  {s:"There is growing ___ that the deadline cannot be met.", stem:"ACKNOWLEDGE", a:["acknowledgement","acknowledgment"], why:"UK prefers acknowledgement (with e)."}
];

/* Use of English Part 4 — Key word transformation */
BANK.kwt = [
  {s1:"I'm sure he didn't mean to offend you.", key:"MEANT", pre:"He", post:"to offend you.", a:["can't have meant","cannot have meant","couldn't have meant","could not have meant"], why:"Deduction about the past: can't/couldn't + have + past participle."},
  {s1:"It wasn't necessary for you to finish the report tonight, but you did.", key:"NEED", pre:"You", post:"the report tonight.", a:["needn't have finished","need not have finished"], why:"needn't have done = you did it, but it was unnecessary."},
  {s1:"As soon as the meeting started, the fire alarm went off.", key:"SOONER", pre:"No", post:"than the fire alarm went off.", a:["sooner had the meeting started"], why:"Inversion: No sooner had + subject + past participle ... than."},
  {s1:"They postponed the launch because of the bad weather.", key:"PUT", pre:"The launch", post:"because of the bad weather.", a:["was put off"], why:"Passive of the phrasal verb 'put off' (= postpone)."},
  {s1:"I regret not accepting the job offer.", key:"WISH", pre:"I", post:"the job offer.", a:["wish i had accepted","wish i'd accepted"], why:"Regret about the past: wish + past perfect."},
  {s1:"It's possible that the client has forgotten about the deadline.", key:"MAY", pre:"The client", post:"about the deadline.", a:["may have forgotten"], why:"may + have + past participle = past possibility."},
  {s1:"People say that the company is in serious trouble.", key:"SAID", pre:"The company", post:"in serious trouble.", a:["is said to be"], why:"Impersonal passive: subject + is said to + infinitive."},
  {s1:"We only realised our mistake when the audit was published.", key:"UNTIL", pre:"It", post:"the audit was published that we realised our mistake.", a:["was not until","wasn't until"], why:"Cleft: It wasn't until ... that ..."},
  {s1:"I'd prefer you not to mention this to the board.", key:"RATHER", pre:"I'd", post:"mention this to the board.", a:["rather you didn't","rather you did not"], why:"would rather + subject + past simple (for another person's actions)."},
  {s1:"It was such a boring presentation that half the audience left.", key:"SO", pre:"The presentation", post:"half the audience left.", a:["was so boring that","was so boring"], why:"such + noun / so + adjective."},
  {s1:"The manager blamed Tom for the delay.", key:"RESPONSIBLE", pre:"The manager held", post:"the delay.", a:["tom responsible for"], why:"hold someone responsible for something."},
  {s1:"You should apologise to her immediately.", key:"HIGH", pre:"It's", post:"to her.", a:["high time you apologised","high time you apologized"], why:"It's high time + past simple. UK spelling: apologised."},
  {s1:"He is very unlikely to win the race.", key:"CHANCE", pre:"There is", post:"of him winning the race.", a:["little chance","very little chance","hardly any chance","not much chance","only a slim chance","a slim chance"], why:"little chance of + -ing."},
  {s1:"We must deal with this problem immediately.", key:"DEALT", pre:"This problem must", post:"immediately.", a:["be dealt with"], why:"Passive with a prepositional verb keeps the preposition: be dealt with."},
  {s1:"It's not worth arguing with him.", key:"POINT", pre:"There's", post:"with him.", a:["no point arguing","no point in arguing"], why:"There's no point (in) + -ing."},
  {s1:"Our sales have fallen because of the new competitor.", key:"RESULT", pre:"Our sales have fallen", post:"the new competitor.", a:["as a result of"], why:"as a result of = because of."},
  {s1:"She succeeded in convincing the investors.", key:"MANAGED", pre:"She", post:"the investors.", a:["managed to convince"], why:"succeed in + -ing = manage to + infinitive."},
  {s1:"I've never seen such an impressive goal.", key:"EVER", pre:"It's the most impressive goal", post:".", a:["i have ever seen","i've ever seen"], why:"Superlative + present perfect + ever."},
  {s1:"The project was cancelled because there wasn't enough funding.", key:"LACK", pre:"The project was cancelled", post:"funding.", a:["due to a lack of","due to lack of","because of a lack of","because of lack of","owing to a lack of","owing to lack of"], why:"due to / because of + a lack of + noun."},
  {s1:"They didn't tell us about the changes until the last minute.", key:"KEPT", pre:"We", post:"about the changes until the last minute.", a:["were kept in the dark"], why:"Idiom: keep someone in the dark (no informar)."},
  {s1:"You can borrow my laptop, but you must return it by Friday.", key:"LONG", pre:"You can borrow my laptop", post:"it by Friday.", a:["as long as you return","so long as you return"], why:"as long as = on condition that."},
  {s1:"Although she was exhausted, she finished the marathon.", key:"DESPITE", pre:"She finished the marathon", post:"exhausted.", a:["despite being","despite feeling"], why:"despite + -ing (never 'despite of')."}
];

/* Use of English Part 2 — Open cloze */
BANK.oc = [
  {s:"___ though the forecast was poor, the match went ahead.", a:["even"], why:"Even though = aunque (emphatic)."},
  {s:"Not ___ did she lead the team, but she also designed the system.", a:["only"], why:"Inversion: Not only did..., but also..."},
  {s:"The deal fell ___ at the last minute.", a:["through"], why:"fall through = fracasar (a plan or deal)."},
  {s:"She has a real knack ___ solving complex problems.", a:["for"], why:"have a knack for (doing) something."},
  {s:"___ it not been for his quick thinking, the bridge would have collapsed.", a:["had"], why:"Inverted third conditional: Had it not been for..."},
  {s:"The more you practise, the ___ confident you become.", a:["more"], why:"The more..., the more... (comparative correlative)."},
  {s:"He is by ___ means the best candidate for the job.", a:["no"], why:"by no means = de ninguna manera."},
  {s:"We'll launch the product ___ long as the final tests are successful.", a:["as","so"], why:"as long as / so long as = siempre que."},
  {s:"It's high time we ___ a decision.", a:["made","took"], why:"It's high time + past simple. UK: take a decision is also correct."},
  {s:"The team is used to ___ under intense pressure.", a:["working"], why:"be used to + -ing (estar acostumbrado)."},
  {s:"___ of the two proposals was accepted, so we started again.", a:["neither"], why:"Neither of the two = ninguno de los dos."},
  {s:"She was on the ___ of resigning when they offered her a promotion.", a:["verge","point","brink"], why:"on the verge/point/brink of + -ing."},
  {s:"In spite ___ the rain, thousands of fans turned up.", a:["of"], why:"in spite of = despite."},
  {s:"The CEO, ___ vision transformed the firm, retired last year.", a:["whose"], why:"Possessive relative pronoun."},
  {s:"He talked as ___ he knew everything about engineering.", a:["if","though"], why:"as if / as though."},
  {s:"Little ___ they know what was about to happen.", a:["did"], why:"Inversion after negative adverbial 'little'."},
  {s:"The striker was sent ___ for a second yellow card.", a:["off"], why:"be sent off = ser expulsado (UK football)."},
  {s:"We need to cut ___ on unnecessary expenses.", a:["back","down"], why:"cut back on / cut down on = reducir."},
  {s:"___ matter how hard they tried, they couldn't fix the bug.", a:["no"], why:"No matter how... = por mucho que."},
  {s:"The report was finished ahead ___ schedule.", a:["of"], why:"ahead of schedule = antes de lo previsto."},
  {s:"She is widely regarded ___ one of the best engineers of her generation.", a:["as"], why:"be regarded as."},
  {s:"I'd sooner resign ___ accept those conditions.", a:["than"], why:"would sooner X than Y."},
  {s:"The new manager is ___ to announce major changes next week.", a:["due","set","expected","likely","going"], why:"be due/set to = estar previsto."},
  {s:"___ you need any further information, please do not hesitate to contact me.", a:["should"], why:"Formal inverted conditional: Should you need... = If you need..."}
];

/* Use of English Part 1 — Multiple-choice cloze (collocations) */
BANK.mc = [
  {s:"The company has ___ a significant loss this quarter.", o:["made","incurred","done","caused"], a:1, why:"incur a loss/costs/debt."},
  {s:"She ___ great pride in her work.", o:["takes","makes","has","gives"], a:0, why:"take pride in something."},
  {s:"The engineers ___ a breakthrough after months of testing.", o:["did","made","got","took"], a:1, why:"make a breakthrough."},
  {s:"We need to ___ the deadline at all costs.", o:["reach","meet","arrive","catch"], a:1, why:"meet a deadline (cumplir un plazo)."},
  {s:"The match ended in a ___ draw.", o:["goalless","scoreless","pointless","empty"], a:0, why:"UK football: a goalless draw (0-0), also 'nil-nil'."},
  {s:"He ___ the blame for the project's failure.", o:["took","made","caught","held"], a:0, why:"take the blame."},
  {s:"Let's ___ a brainstorming session tomorrow morning.", o:["hold","make","do","take"], a:0, why:"hold a meeting/session."},
  {s:"The report ___ serious doubts about the plan.", o:["rose","raised","lifted","grew"], a:1, why:"raise doubts/concerns (transitive). 'Rise' is intransitive."},
  {s:"It was a ___ decision, made without much thought.", o:["snap","quick","rapid","fast"], a:0, why:"a snap decision = decisión precipitada."},
  {s:"Please ___ in mind that the office closes at five.", o:["bear","hold","take","carry"], a:0, why:"bear in mind = tener en cuenta."},
  {s:"The new regulations came into ___ last month.", o:["force","power","action","place"], a:0, why:"come into force (laws, rules)."},
  {s:"Our profits have ___ a record high.", o:["hit","struck","beaten","met"], a:0, why:"hit a record high/low."},
  {s:"He has a ___ interest in motor racing.", o:["keen","sharp","eager","hard"], a:0, why:"a keen interest."},
  {s:"The proposal was rejected out of ___.", o:["hand","mind","place","order"], a:0, why:"reject out of hand = rechazar de plano."},
  {s:"I've been ___ under with work lately.", o:["snowed","rained","flooded","stormed"], a:0, why:"be snowed under = estar desbordado."},
  {s:"Starting a business on a ___ is risky but possible.", o:["shoestring","bootlace","thread","string"], a:0, why:"on a shoestring = con muy poco dinero."},
  {s:"The board decided to bite the ___ and cut costs.", o:["bullet","dust","hand","tongue"], a:0, why:"bite the bullet = hacer algo difícil pero necesario."},
  {s:"The figures simply don't ___ up.", o:["add","sum","count","total"], a:0, why:"not add up = no cuadrar."},
  {s:"The scheme was ___ to failure from the start.", o:["doomed","destined","fated","bound"], a:0, why:"doomed to failure (strong collocation)."},
  {s:"She ___ a valid point about the budget.", o:["raised","rose","put","got"], a:0, why:"raise/make a valid point."},
  {s:"The two teams are ___ matched, so it should be a close game.", o:["evenly","equally","fairly","flatly"], a:0, why:"evenly matched."},
  {s:"The CEO ___ down after the scandal.", o:["stepped","went","sat","fell"], a:0, why:"step down = dimitir."},
  {s:"There's a ___ chance of rain this afternoon.", o:["strong","heavy","thick","powerful"], a:0, why:"a strong/good chance."},
  {s:"The project is running ___ behind schedule.", o:["badly","heavily","deeply","strongly"], a:0, why:"run badly behind schedule. Also 'well behind'."}
];

/* Phrasal verbs, idioms & British slang — quickfire */
BANK.idioms = [
  {t:"call it a day", m:"stop working on something", d:["start the day early","phone someone daily","celebrate a success"], ex:"We've been at this for ten hours — let's call it a day."},
  {t:"knackered", m:"extremely tired", d:["broken beyond repair","very angry","slightly drunk"], ex:"I'm absolutely knackered after that shift."},
  {t:"chuffed", m:"very pleased", d:["out of breath","slightly confused","bored"], ex:"She was chuffed to bits with her promotion."},
  {t:"gutted", m:"extremely disappointed", d:["very hungry","completely empty","furious"], ex:"The fans were gutted after the late equaliser."},
  {t:"skive off", m:"avoid work or school without a good reason", d:["leave a job formally","take a short break","work extra hours"], ex:"He skived off on Friday to watch the cricket."},
  {t:"faff about", m:"waste time doing unimportant things", d:["make a lot of noise","argue loudly","act very confidently"], ex:"Stop faffing about and send the email!"},
  {t:"a piece of cake", m:"something very easy", d:["a small reward","a fair share","a short break"], ex:"The first round of interviews was a piece of cake."},
  {t:"get the ball rolling", m:"start an activity or process", d:["play football","win easily","lose control"], ex:"Let's get the ball rolling with a quick round of introductions."},
  {t:"back to square one", m:"back to the beginning after a failure", d:["in first place","in a difficult position","in a small office"], ex:"The client rejected the design, so we're back to square one."},
  {t:"cut corners", m:"do something badly to save time or money", d:["take a shortcut on foot","reduce staff","drive dangerously"], ex:"If we cut corners on safety, someone will get hurt."},
  {t:"bring something forward", m:"move an event to an earlier date", d:["propose an idea","improve something","delay something"], ex:"The launch has been brought forward to March."},
  {t:"iron out", m:"solve small problems or difficulties", d:["make something flat","cancel a plan","argue about details"], ex:"We still need to iron out a few issues with the supplier."},
  {t:"touch base", m:"make brief contact with someone", d:["score a point","visit headquarters","agree completely"], ex:"Let's touch base on Monday about the budget."},
  {t:"the ball is in your court", m:"it's your turn to take action", d:["you have won","you are in trouble","you must play fairly"], ex:"I've sent the offer — the ball's in their court now."},
  {t:"a ballpark figure", m:"a rough estimate", d:["a sports statistic","a large sum of money","an exact total"], ex:"Can you give me a ballpark figure for the refurbishment?"},
  {t:"move the goalposts", m:"change the rules or targets unfairly", d:["make progress","relocate a team","score an own goal"], ex:"Every time we hit the target, management moves the goalposts."},
  {t:"spill the beans", m:"reveal a secret", d:["make a mess","waste money","cook badly"], ex:"Come on, spill the beans — did you get the job?"},
  {t:"under the weather", m:"slightly ill", d:["worried about money","outdoors","very busy"], ex:"I'm feeling a bit under the weather today."},
  {t:"bob's your uncle", m:"and that's it; it's done", d:["he's a family member","be careful","what a surprise"], ex:"Click 'save', restart the app, and Bob's your uncle."},
  {t:"take something with a pinch of salt", m:"not completely believe something", d:["add flavour","accept it politely","exaggerate"], ex:"Take transfer rumours with a pinch of salt."},
  {t:"a dab hand at", m:"very skilled at", d:["new to","bored by","afraid of"], ex:"She's a dab hand at spreadsheets."},
  {t:"pull your weight", m:"do your fair share of the work", d:["lose weight","use your influence","lift heavy things"], ex:"Everyone on the team has to pull their weight."},
  {t:"have a lot on your plate", m:"have a lot of work or problems", d:["eat too much","be wealthy","be very lucky"], ex:"I can't take on the audit — I've got a lot on my plate."},
  {t:"the bottom line", m:"the most important fact; also net profit", d:["the lowest price","the last sentence","the worst result"], ex:"The bottom line is that we can't afford it."},
  {t:"throw in the towel", m:"give up", d:["start a fight","clean up","celebrate a win"], ex:"After three failed attempts, they threw in the towel."},
  {t:"get off on the wrong foot", m:"start a relationship badly", d:["trip over","arrive late","choose the wrong option"], ex:"We got off on the wrong foot, but now we get on brilliantly."},
  {t:"get on with someone", m:"have a good relationship with someone", d:["travel with someone","compete with someone","copy someone"], ex:"I get on really well with my line manager."},
  {t:"put up with", m:"tolerate", d:["build","accommodate guests","promote"], ex:"I won't put up with this behaviour any longer."},
  {t:"come up with", m:"think of an idea or plan", d:["reach someone","arrive together","agree with"], ex:"She came up with a brilliant workaround."},
  {t:"run out of", m:"have none left", d:["escape from","exceed","leave quickly"], ex:"We've run out of time, so let's wrap up."},
  {t:"wrap up", m:"finish something", d:["give a present","dress warmly only","hide something"], ex:"Let's wrap up the meeting — any final questions?"},
  {t:"take on", m:"accept work or responsibility; also employ", d:["remove","wear","compete against only"], ex:"The firm is taking on twenty new graduates."},
  {t:"cheeky", m:"slightly rude but in a funny or charming way", d:["very generous","extremely shy","dishonest"], ex:"Fancy a cheeky pint after work?"},
  {t:"a bit of a nightmare", m:"quite difficult or unpleasant", d:["a bad dream","a scary film","slightly funny"], ex:"Getting across London on a Friday is a bit of a nightmare."},
  {t:"miss the boat", m:"miss an opportunity", d:["arrive late to a port","get seasick","fail an exam"], ex:"If we don't invest now, we'll miss the boat."},
  {t:"keep your head above water", m:"just manage to survive, especially financially", d:["swim well","stay calm","stay healthy"], ex:"Many small firms are barely keeping their heads above water."},
  {t:"red tape", m:"excessive official rules and paperwork", d:["a safety barrier","a warning","a celebration"], ex:"The project was delayed by months of red tape."},
  {t:"not my cup of tea", m:"not something I like", d:["not my fault","not my turn","not my business"], ex:"Reality TV is not really my cup of tea."},
  {t:"the elephant in the room", m:"an obvious problem nobody wants to discuss", d:["a very large person","a clumsy colleague","an expensive mistake"], ex:"The budget overrun was the elephant in the room."},
  {t:"on the same page", m:"in agreement; sharing the same understanding", d:["in the same office","reading together","equally skilled"], ex:"Before we present, let's make sure we're all on the same page."}
];

/* Spelling & British spelling — dictation */
BANK.spell = [
  {w:"accommodation", s:"The company will pay for your accommodation.", tip:"Double c AND double m."},
  {w:"necessary", s:"It isn't necessary to bring a laptop.", tip:"One collar (c), two sleeves (ss)."},
  {w:"separate", s:"Please keep the two budgets separate.", tip:"There's 'a rat' in sep-a-rate."},
  {w:"definitely", s:"We will definitely finish on time.", tip:"Contains 'finite' — no 'a'."},
  {w:"occurrence", s:"Delays are a common occurrence on this line.", tip:"Double c, double r, ends -ence."},
  {w:"embarrass", s:"I didn't mean to embarrass you.", tip:"Double r AND double s."},
  {w:"colleague", s:"My colleague will send you the details.", tip:"Double l, ends -eague."},
  {w:"committee", s:"The committee meets every Tuesday.", tip:"Double m, double t, double e."},
  {w:"guarantee", s:"We can't guarantee the results.", tip:"gu-a-ran-tee: the u is silent."},
  {w:"conscientious", s:"She is a conscientious and reliable engineer.", tip:"con-science-tious."},
  {w:"programme", s:"The training programme lasts six weeks.", us:"program", tip:"UK: programme. 'Program' only for computer software."},
  {w:"organise", s:"Could you organise the meeting?", us:"organize", tip:"UK usually -ise (organize is also accepted in UK, but -ise is more common)."},
  {w:"analyse", s:"We need to analyse the data carefully.", us:"analyze", tip:"UK: analyse with -yse (never -yze)."},
  {w:"behaviour", s:"His behaviour was completely unacceptable.", us:"behavior", tip:"UK: -our."},
  {w:"favourite", s:"Who is your favourite player?", us:"favorite", tip:"UK: -our."},
  {w:"centre", s:"The office is in the city centre.", us:"center", tip:"UK: -re (centre, metre, theatre)."},
  {w:"travelled", s:"She travelled to Manchester for the conference.", us:"traveled", tip:"UK doubles the final l: travelled, cancelled, modelling."},
  {w:"cancelled", s:"The match was cancelled because of snow.", us:"canceled", tip:"UK: double l."},
  {w:"licence", s:"You need a licence to sell alcohol.", us:"license", tip:"UK: licence (noun), license (verb)."},
  {w:"practise", s:"You should practise every day.", us:"practice", tip:"UK: practise (verb), practice (noun)."},
  {w:"defence", s:"The team's defence was solid all season.", us:"defense", tip:"UK: -ence."},
  {w:"catalogue", s:"I'll send you our latest catalogue.", us:"catalog", tip:"UK: -ogue."},
  {w:"fulfil", s:"He worked hard to fulfil his potential.", us:"fulfill", tip:"UK: fulfil (one l at the end), but fulfilling/fulfilled."},
  {w:"enrol", s:"You must enrol before the end of September.", us:"enroll", tip:"UK: enrol, enrolment."},
  {w:"cheque", s:"I paid by cheque.", us:"check", tip:"UK: cheque (bank)."},
  {w:"tyre", s:"We had a flat tyre on the motorway.", us:"tire", tip:"UK: tyre (wheel)."},
  {w:"jewellery", s:"She designs handmade jewellery.", us:"jewelry", tip:"UK: jewellery (double l + e)."},
  {w:"sceptical", s:"Investors remain sceptical about the plan.", us:"skeptical", tip:"UK: sc-."},
  {w:"grey", s:"The sky was grey all day.", us:"gray", tip:"UK: grey."},
  {w:"manoeuvre", s:"Parking here takes a tricky manoeuvre.", us:"maneuver", tip:"UK: manoeuvre (oe + -re)."},
  {w:"aluminium", s:"The frame is made of aluminium.", us:"aluminum", tip:"UK: aluminium (5 syllables)."},
  {w:"judgement", s:"Use your own judgement.", us:"judgment", tip:"UK general use: judgement."},
  {w:"rhythm", s:"The team found its rhythm in the second half.", tip:"No vowels except y: r-h-y-t-h-m."},
  {w:"privilege", s:"It's a privilege to work with you.", tip:"No d: privi-lege."},
  {w:"questionnaire", s:"Please fill in the questionnaire.", tip:"Double n."},
  {w:"entrepreneur", s:"He's a successful entrepreneur.", tip:"entre-pre-neur (French origin)."},
  {w:"maintenance", s:"The lift is closed for maintenance.", tip:"main-ten-ance, not 'maintainance'."},
  {w:"pronunciation", s:"Her pronunciation is excellent.", tip:"pro-NUN-ciation: no 'noun' in it."},
  {w:"recommend", s:"I'd recommend booking in advance.", tip:"One c, double m."},
  {w:"address", s:"What's your email address?", tip:"Double d, double s."},
  {w:"receive", s:"Did you receive my message?", tip:"i before e, except after c."},
  {w:"argument", s:"They had a heated argument.", tip:"argue loses the e: argument."},
  {w:"successful", s:"The launch was very successful.", tip:"Double c, double s, one l."},
  {w:"environment", s:"We must protect the environment.", tip:"enviro-N-ment: don't forget the n."},
  {w:"government", s:"The government announced new measures.", tip:"gover-N-ment."},
  {w:"business", s:"She runs her own business.", tip:"busi-ness: i after s."},
  {w:"Wednesday", s:"See you on Wednesday.", tip:"Wed-nes-day: silent d."},
  {w:"liaise", s:"You'll liaise with the client directly.", tip:"Two i's: l-i-a-i-s-e."},
  {w:"perseverance", s:"Success requires perseverance.", tip:"perse-ver-ance (no 'r' after per-se)."},
  {w:"threshold", s:"Profits exceeded the threshold.", tip:"One h in the middle: thres-hold."},
  {w:"withhold", s:"They decided to withhold payment.", tip:"Double h: with-hold."},
  {w:"acknowledgement", s:"I haven't received an acknowledgement yet.", us:"acknowledgment", tip:"UK: keep the e."},
  {w:"queue", s:"There was a long queue at the station.", tip:"q-ueue: four vowels in a row."},
  {w:"knowledgeable", s:"He's very knowledgeable about finance.", tip:"Keep the e: knowledge-able."},
  {w:"millennium", s:"The bridge was built for the millennium.", tip:"Double l, double n."},
  {w:"exaggerate", s:"Don't exaggerate the risks.", tip:"Double g, one r."},
  {w:"tomorrow", s:"The report is due tomorrow.", tip:"One m, double r."},
  {w:"beginning", s:"At the beginning of the project...", tip:"Double n before -ing."}
];

/* Grammar & false friends — error hunt (Spanish speakers' typical mistakes) */
BANK.err = [
  {c:["I","am working","here","since 2019."], e:1, o:["have been working","was working","work"], a:0, why:"With since/for for something still true → present perfect (continuous). 'Llevo trabajando'."},
  {c:["She","explained me","the","new procedure."], e:1, o:["explained to me","explained for me","explained at me"], a:0, why:"explain something TO someone. Never 'explain me'."},
  {c:["The","informations","you sent","were very useful."], e:1, o:["information","informaciones","pieces of informations"], a:0, why:"Information is uncountable — and then 'was'. (Use 'pieces of information' to count.)", fix:"The information you sent was very useful."},
  {c:["I","am agree","with","your proposal."], e:1, o:["agree","am agreed","am agreeing"], a:0, why:"Agree is a verb: I agree. 'Estoy de acuerdo' ≠ 'I am agree'."},
  {c:["It","depends of","the","budget."], e:1, o:["depends on","depends from","depends in"], a:0, why:"depend ON (not of)."},
  {c:["We","discussed about","the","timeline yesterday."], e:1, o:["discussed","discussed on","discussed of"], a:0, why:"discuss + object directly. (But: talk about.)"},
  {c:["If I","would have known,","I would have","told you."], e:1, o:["had known,","would know,","knew,"], a:0, why:"Third conditional: If + past perfect, would have + pp."},
  {c:["People","is","really worried","about the economy."], e:1, o:["are","be","was"], a:0, why:"People is plural: people are."},
  {c:["I","look forward to","meet","you next week."], e:2, o:["meeting","meet with","met"], a:0, why:"look forward to + -ing (to is a preposition here)."},
  {c:["She","has","a lot of experiences","in finance."], e:2, o:["a lot of experience","many experience","much experiences"], a:0, why:"Professional experience is uncountable."},
  {c:["He","gave me","some good advices","on investing."], e:2, o:["some good advice","a good advices","some goods advice"], a:0, why:"Advice is uncountable. A piece of advice."},
  {c:["I","have","35 years","old."], e:1, o:["am","has","got"], a:0, why:"Age uses BE: I am 35 (years old)."},
  {c:["Despite of","the rain,","the match","went ahead."], e:0, o:["Despite","In spite","Despite to"], a:0, why:"Despite (no 'of') / In spite of."},
  {c:["We","have made","a lot of","progresses this month."], e:3, o:["progress this month.","progressions this month.","progresses in this month."], a:0, why:"Progress is uncountable."},
  {c:["I","didn't","went","to the meeting."], e:2, o:["go","gone","going"], a:0, why:"After did/didn't → base form."},
  {c:["Is","important","to meet","deadlines."], e:0, o:["It is","It's an","There is"], a:0, why:"English needs a subject: IT is important..."},
  {c:["She","is","more tall","than her brother."], e:2, o:["taller","more taller","most tall"], a:0, why:"Short adjectives: -er."},
  {c:["I'll call you","when","I will arrive","at the office."], e:2, o:["I arrive","I'd arrive","I'm going to arrive"], a:0, why:"Time clauses (when, as soon as...) use present for future."},
  {c:["I","have been","in London","last year."], e:1, o:["was","have gone","had been"], a:0, why:"Finished time (last year) → past simple."},
  {c:["He","assisted","the conference","in Madrid."], e:1, o:["attended","went","helped"], a:0, why:"False friend: asistir a = attend. Assist = help."},
  {c:["The","actual","CEO","is very young."], e:1, o:["current","real","present-day"], a:0, why:"False friend: actual = current. 'Actual' in English = real."},
  {c:["She","is","embarrassed —","the baby is due in May."], e:2, o:["pregnant —","expecting a baby —","embarrassing —"], a:0, why:"False friend! Embarrassed = avergonzado. Embarazada = pregnant."},
  {c:["Our","sensible","data","must be protected."], e:1, o:["sensitive","sensational","sensory"], a:0, why:"False friend: sensible = sensato. Sensible (data) = sensitive."},
  {c:["We","realised","the analysis","last week."], e:1, o:["carried out","made up","realised out"], a:0, why:"False friend: realizar = carry out / do. Realise = darse cuenta."},
  {c:["I","want that you","review","the contract."], e:1, o:["want you to","want what you","wish that you"], a:0, why:"want + object + to-infinitive. Never 'want that'."},
  {c:["He","made","a","mistake and remained very nervous."], e:3, o:["mistake and was very nervous.","mistake and stayed very nervously.","mistake and resulted nervous."], a:0, why:"'Quedarse nervioso' → be/get nervous, not 'remain'."},
  {c:["The","news","are","very good today."], e:2, o:["is","were","have"], a:0, why:"News is uncountable and singular: the news is."},
  {c:["She","suggested","me to apply","for the role."], e:2, o:["that I apply","me applying to","to me to apply"], a:0, why:"suggest + that-clause or -ing. Never 'suggest me to'."},
  {c:["I","am","boring","in this meeting."], e:2, o:["bored","boredom","bore"], a:0, why:"-ed = how you feel. -ing = what causes it. 'I'm boring' = soy aburrido."},
  {c:["We","must","to finish","the report today."], e:2, o:["finish","finishing","have finish"], a:0, why:"Modal verbs + base form (no 'to')."}
];

/* Reading — original C1 texts on your topics */
BANK.reading = [
 {id:"r-bridge", topic:"Engineering", title:"The Bridge That Wobbled", mins:4,
  body:`When London's Millennium Bridge opened in June 2000, thousands of people crowded onto the sleek steel footbridge linking St Paul's Cathedral to Tate Modern. Within minutes, something unexpected happened: the bridge began to sway from side to side. Pedestrians instinctively adjusted their stride to keep their balance, and in doing so they walked in step with the movement, amplifying it further. Two days later, the bridge was closed, and the press promptly nicknamed it "the Wobbly Bridge".

What made the episode so embarrassing was that the structure was, by every conventional measure, perfectly sound. The engineers had calculated the vertical loads meticulously. What they had not fully anticipated was a phenomenon now known as synchronous lateral excitation: a feedback loop in which a small horizontal movement prompts people to synchronise their steps, which in turn reinforces the movement.

Rather than demolishing or radically redesigning the bridge, the team opted for a more elegant solution. They retrofitted it with dampers — devices that absorb energy, much like the shock absorbers in a car — and the bridge reopened in 2002. It has barely moved since.

The lesson for engineers went far beyond one footbridge. The case showed that a structure cannot be analysed in isolation from the people who use it. Human behaviour, it turned out, was a load case in its own right. Design codes around the world were subsequently revised, and lateral vibration became a standard consideration for long, lightweight footbridges.

There is also a lesson for anyone who manages projects. The engineers did not try to hide the problem or blame the public for walking "incorrectly". They acknowledged the flaw, investigated it rigorously and shared their findings openly, which allowed the whole profession to learn. In many organisations, mistakes are buried rather than examined. The Millennium Bridge is a reminder that a well-handled failure can be worth more than a dozen quiet successes.`,
  gloss:{"sleek":"elegante, de líneas limpias","sway":"balancearse","stride":"zancada, paso","amplifying":"ampliando, aumentando","promptly":"rápidamente, enseguida","meticulously":"meticulosamente","feedback loop":"bucle de retroalimentación","retrofitted":"equipado a posteriori (reacondicionado)","dampers":"amortiguadores","in its own right":"por derecho propio","rigorously":"rigurosamente","buried":"enterrado, ocultado"},
  q:[
   {q:"Why did the bridge start to sway more and more?", o:["The steel was too weak for the vertical loads","People's steps synchronised with the movement and reinforced it","Strong winds hit it on the opening day","It was overcrowded beyond its legal limit"], a:1},
   {q:"According to the text, the engineers' original calculations were…", o:["careless and incomplete","correct for vertical loads","never checked","based on old design codes"], a:1},
   {q:"What does the writer mean by 'Human behaviour was a load case in its own right'?", o:["People are heavier than expected","Human movement must be treated as a structural force to design for","Engineers should study psychology","Crowds should be banned from bridges"], a:1},
   {q:"What is the main lesson for project managers?", o:["Avoid innovative designs","Always blame external factors","Openly analysing failures benefits everyone","Never launch a project on time"], a:2}
  ]},
 {id:"r-planning", topic:"Project management", title:"Why Every Project Runs Late", mins:4,
  body:`Ask any experienced project manager how long a task will take, and then ask how long it actually took. The gap between the two numbers has a name. In 1979, the psychologists Daniel Kahneman and Amos Tversky described the "planning fallacy": our tendency to underestimate the time, cost and risk of future actions, even when we know that similar tasks have overrun in the past.

The fallacy is remarkably persistent. We plan from the inside, imagining the best-case sequence of steps and quietly assuming that nothing will go wrong. Suppliers deliver on time, colleagues are never ill, and the software works first time. Reality, of course, rarely co-operates.

The writer Douglas Hofstadter captured the problem with a self-referential joke now known as Hofstadter's Law: "It always takes longer than you expect, even when you take into account Hofstadter's Law." It is funny precisely because it rings true.

So what can be done? One of the most effective remedies is known as reference class forecasting, an approach championed by the Danish planning expert Bent Flyvbjerg. Rather than building an estimate from the bottom up, you start by looking at a reference class — a set of comparable projects that have already been completed — and ask how long those actually took and how much they actually cost. Only then do you adjust for the specific features of your own project. This "outside view" anchors the forecast in evidence rather than optimism.

A second technique is the pre-mortem. Before the project starts, the team imagines that it has failed spectacularly and works backwards to explain why. Because people are no longer defending the plan, they feel free to voice concerns they would otherwise keep to themselves.

None of this eliminates uncertainty. But it does shift the conversation from wishful thinking to honest risk management — and that, in the long run, is what keeps both budgets and reputations intact.`,
  gloss:{"overrun":"excederse (en tiempo o coste)","fallacy":"falacia","persistent":"persistente","rarely co-operates":"rara vez colabora","rings true":"suena verdadero","remedies":"remedios, soluciones","championed":"defendido, promovido","anchors":"ancla, fija","voice concerns":"expresar preocupaciones","wishful thinking":"ilusiones, pensamiento ilusorio","intact":"intacto"},
  q:[
   {q:"What is the planning fallacy?", o:["Planning too far ahead","Underestimating time, cost and risk despite past experience","Refusing to make any plans","Overestimating how long tasks will take"], a:1},
   {q:"Why is Hofstadter's Law described as funny?", o:["It contradicts itself","It is obviously false","It is true even when you try to apply it","It was written by a comedian"], a:2},
   {q:"Reference class forecasting starts by…", o:["listing every task in detail","looking at similar completed projects","asking the client for a deadline","adding 50% to the estimate"], a:1},
   {q:"What is the main benefit of a pre-mortem?", o:["It makes the project cheaper","It allows people to raise concerns freely","It replaces risk management","It guarantees success"], a:1}
  ]},
 {id:"r-habits", topic:"Personal development", title:"Stop Waiting for Motivation", mins:4,
  body:`We tend to talk about motivation as if it were a kind of weather: something that arrives unannounced, lingers for a while and then disappears. On a good day, we feel inspired to go for a run, learn a language or finally tackle that report. On a bad day, we wait for the clouds to clear. The problem is that, for most people, the bad days outnumber the good ones.

Research in behavioural psychology suggests that relying on motivation is a losing strategy. People who consistently achieve their goals are not necessarily more motivated than everyone else. Rather, they have built systems that make the desired behaviour almost automatic.

One of the best-studied tools is the "implementation intention", a concept developed by the psychologist Peter Gollwitzer. Instead of setting a vague goal such as "I will study English more", you specify exactly when, where and how you will act: "When I sit down on the train in the morning, I will do fifteen minutes of vocabulary practice." This if–then format links the new habit to an existing cue, so the decision has effectively been made in advance.

A second principle is to make the first step ridiculously small. If the goal is to write every day, commit to writing a single sentence. It sounds trivial, but starting is usually the hardest part; once you have begun, you will often carry on. Crucially, the small step protects your identity as "someone who writes every day", even on days when you can only manage the bare minimum.

Finally, it pays to track your progress visibly. A streak on a calendar or a chart that inches upwards provides a small but genuine sense of reward, and most of us are reluctant to break a chain we have worked hard to build.

Motivation, in other words, is better seen as a result of action than as its cause. Start first; the feeling tends to follow.`,
  gloss:{"unannounced":"sin avisar","lingers":"se queda, persiste","tackle":"abordar, enfrentarse a","outnumber":"superar en número","cue":"señal, desencadenante","trivial":"insignificante","carry on":"continuar","bare minimum":"lo mínimo indispensable","inches upwards":"sube poco a poco","reluctant":"reacio"},
  q:[
   {q:"Why does the writer compare motivation to the weather?", o:["Because it depends on the season","Because it comes and goes unpredictably","Because it is stronger in summer","Because scientists can forecast it"], a:1},
   {q:"What is the key feature of an implementation intention?", o:["It sets an ambitious long-term goal","It links a specific action to a specific situation","It relies on rewards from other people","It avoids planning in advance"], a:1},
   {q:"Why make the first step 'ridiculously small'?", o:["To finish faster","Because big goals are unrealistic","Because starting is hardest and it protects your identity","To impress other people"], a:2},
   {q:"What is the writer's main conclusion?", o:["Motivation is the key to success","Action tends to create motivation","Only disciplined people succeed","Streaks are harmful"], a:1}
  ]},
 {id:"r-compound", topic:"Business & finance", title:"The Quiet Power of Compounding", mins:4,
  body:`Albert Einstein almost certainly never called compound interest "the eighth wonder of the world", despite the countless websites that claim he did. But whoever coined the phrase had a point. Compounding — earning returns not only on your original money but also on the returns themselves — is one of the most powerful and least intuitive forces in personal finance.

The difficulty is that our brains think in straight lines. If you save £200 a month, it is easy to work out that you will have put away £24,000 after ten years. It is far harder to picture what happens when that money grows at, say, 6% a year and the gains are reinvested. After ten years, the pot would be worth roughly £33,000. After thirty years, the total contributions would be £72,000, but the pot could exceed £200,000. Most of that growth arrives late, which is precisely why so many people give up too early.

Time, in other words, matters more than timing. Investors who try to jump in and out of the market in order to avoid falls frequently miss the handful of exceptionally good days that account for a large share of long-term returns. Sitting tight, though psychologically uncomfortable, has historically been the more rewarding strategy.

In the UK, tax-efficient wrappers such as ISAs and workplace pensions make compounding even more effective, since gains are not eroded by tax along the way. Fees deserve equal scrutiny: an annual charge of 1.5% may sound negligible, but over several decades it can consume a startling proportion of the final value.

None of this is a guarantee. Markets can fall sharply, and past performance is no indication of future returns. But the principle is clear: start early, keep costs low, diversify and be patient. Compounding rewards those who are willing to be boring.`,
  gloss:{"coined the phrase":"acuñó la expresión","had a point":"tenía razón (en parte)","intuitive":"intuitivo","put away":"ahorrado","pot":"bote, fondo acumulado","sitting tight":"mantenerse firme, no moverse","wrappers":"envoltorios (cuentas con ventaja fiscal)","eroded":"erosionado","scrutiny":"escrutinio, examen detallado","negligible":"insignificante","startling":"sorprendente, alarmante"},
  q:[
   {q:"What does the writer say about the Einstein quotation?", o:["It is definitely genuine","It was probably never said by him","It refers to physics, not money","It was invented by banks"], a:1},
   {q:"Why do many people give up on long-term saving too early?", o:["Because interest rates are low","Because most of the growth comes later","Because saving is illegal without an ISA","Because fees are too high"], a:1},
   {q:"'Time matters more than timing' means…", o:["You should check the market every day","Staying invested for long matters more than choosing the perfect moment","You should invest only at the start of the year","Time zones affect returns"], a:1},
   {q:"What does the writer say about a 1.5% annual fee?", o:["It is negligible","It can significantly reduce final value over decades","It is illegal in the UK","It only applies to ISAs"], a:1}
  ]},
 {id:"r-data-football", topic:"Sport", title:"Football's Numbers Game", mins:4,
  body:`For most of the twentieth century, English football ran on instinct. Managers picked players they "liked the look of", scouts filed reports full of phrases such as "good engine" and "reads the game well", and anyone who mentioned statistics in the dressing room risked being laughed out of it. Over the past fifteen years, that culture has been turned on its head.

The most influential new statistic is expected goals, or xG. Rather than simply counting shots, xG estimates the probability that a given chance will result in a goal, based on thousands of similar attempts: the distance from goal, the angle, whether it was a header and so on. A tap-in from two yards might be worth 0.9 xG; a speculative effort from thirty yards perhaps 0.03. Over a season, xG offers a far more reliable picture of how well a team is really playing than the league table alone, which can be distorted by luck.

Several clubs with modest budgets have used this kind of analysis to punch above their weight. By identifying players whose underlying numbers are strong but whose market value is low, they have been able to buy cheaply, develop talent and sell on at a considerable profit. The approach has a clear parallel with value investing: look for assets the market has mispriced.

Not everyone is convinced. Critics argue that numbers cannot capture leadership, character or the ability to perform under pressure in front of 50,000 fans. They have a point: data is a tool, not a replacement for judgement. The most successful clubs tend to combine the two, using analytics to narrow down the options and traditional scouting to make the final call.

What is beyond doubt is that the conversation has changed for good. Today, even pundits on Saturday-night highlights programmes quote xG without a second thought — something that would have been unthinkable not so long ago.`,
  gloss:{"ran on instinct":"funcionaba por instinto","scouts":"ojeadores","good engine":"mucho fondo físico (jerga)","turned on its head":"puesto patas arriba","tap-in":"gol a puerta vacía, empujando","speculative effort":"disparo a la desesperada","distorted":"distorsionado","punch above their weight":"rendir por encima de sus posibilidades","underlying numbers":"estadísticas de fondo","mispriced":"mal valorado (precio)","make the final call":"tomar la decisión final","pundits":"comentaristas, tertulianos"},
  q:[
   {q:"How did English football traditionally evaluate players?", o:["With detailed statistics","Mostly by instinct and subjective impressions","Through university research","Using xG"], a:1},
   {q:"Why is xG more reliable than the league table?", o:["It counts every goal twice","It reduces the effect of luck by measuring chance quality","It is calculated by referees","It ignores headers"], a:1},
   {q:"Why does the writer compare data-driven recruitment to value investing?", o:["Both involve the stock market","Both look for undervalued assets","Both are illegal","Both rely on instinct"], a:1},
   {q:"What is the writer's view of data in football?", o:["It should replace scouts completely","It is useless","It works best combined with human judgement","It only helps rich clubs"], a:2}
  ]}
];

/* Listening — scripts read by a British voice */
BANK.listening = [
 {id:"l-standup", topic:"Project management", title:"Monday stand-up: the delayed release", lines:[
  ["A","Right, morning everyone. Let's keep this brief, because I know we've all got a lot on our plates. Priya, where are we with the release?"],
  ["B","Honestly? Not where I'd like us to be. The integration tests threw up a couple of issues on Friday afternoon, and we've spent most of the weekend trying to iron them out."],
  ["A","Are we talking days or weeks?"],
  ["B","Days, I'd say. Realistically, Thursday. I'd rather push it back two days than ship something we'll have to patch the following week."],
  ["A","Fair enough. The client won't be thrilled, but I'd rather manage expectations now than apologise later. I'll touch base with them this morning."],
  ["B","Thanks. And it might be worth flagging that the supplier still hasn't sent the revised specs. That's partly what held us up."],
  ["A","Noted. I'll chase them as well. Anything else before we wrap up? No? Brilliant. Same time tomorrow."]],
  q:[
   {q:"What caused the problem with the release?", o:["The client changed the requirements","The integration tests revealed issues","A team member was ill","The servers crashed"], a:1},
   {q:"When does Priya realistically expect to release?", o:["Today","Tuesday","Thursday","Next week"], a:2},
   {q:"Why does Priya prefer to delay?", o:["To avoid having to fix it after launch","To get more budget","Because the client asked","Because of a holiday"], a:0},
   {q:"What will the manager do this morning?", o:["Cancel the project","Contact the client and chase the supplier","Fix the bugs personally","Hire more developers"], a:1}],
  dict:["I'd rather push it back two days than ship something we'll have to patch.","I'd rather manage expectations now than apologise later."]},
 {id:"l-pundit", topic:"Sport", title:"Post-match analysis: a frustrating draw", lines:[
  ["A","Well, if you're a home supporter, you'll be absolutely gutted with that. They dominated for eighty-five minutes and came away with a single point."],
  ["A","The numbers tell the story. They had twenty-two shots and an expected goals figure of nearly three, against the visitors' zero point four. On another day, that's a comfortable win."],
  ["A","But football doesn't reward you for what might have happened. The visitors defended deep, kept their shape and, crucially, took their one real chance from a set piece late on."],
  ["A","If I were the manager, I wouldn't panic. The performance was there. What's lacking is a clinical finisher, and with the transfer window opening next month, I suspect that's top of the shopping list."]],
  q:[
   {q:"How does the speaker think home fans feel?", o:["Delighted","Extremely disappointed","Indifferent","Angry at the referee"], a:1},
   {q:"What do the statistics show?", o:["The visitors played better","The home team created far better chances","Both teams were equal","Nobody had any shots"], a:1},
   {q:"How did the visitors score?", o:["From a penalty","From a counter-attack","From a set piece","From an own goal"], a:2},
   {q:"What does the speaker think the team needs?", o:["A new manager","A clinical striker","A better goalkeeper","A new stadium"], a:1}],
  dict:["Football doesn't reward you for what might have happened.","What's lacking is a clinical finisher."]},
 {id:"l-money", topic:"Business & finance", title:"Podcast: the latte factor myth", lines:[
  ["A","You've probably heard the argument that if you stopped buying a coffee every morning, you'd be a millionaire by retirement. It's a lovely soundbite, but I think it misses the point."],
  ["A","Cutting back on small treats does add up, don't get me wrong. But for most people, the big wins come from three areas: housing, transport and how much you earn."],
  ["A","Negotiating a pay rise of even five per cent will usually dwarf anything you'd save on cappuccinos. And if you're paying over the odds on a car you don't really need, that's where I'd start looking."],
  ["A","So by all means, keep an eye on the little things. Just don't beat yourself up about a flat white while ignoring the elephant in the room."]],
  q:[
   {q:"What is the speaker's view of the 'coffee' argument?", o:["It is completely correct","It is catchy but misses the main point","It is a scam","It only applies to Londoners"], a:1},
   {q:"Where does the speaker say the 'big wins' come from?", o:["Food, clothes and holidays","Housing, transport and income","Coffee, tea and snacks","Stocks, bonds and gold"], a:1},
   {q:"'Dwarf' in this context means…", o:["make something look small by comparison","reduce","copy","delay"], a:0},
   {q:"'Paying over the odds' means…", o:["paying in instalments","paying more than something is worth","gambling","getting a discount"], a:1}],
  dict:["Negotiating a pay rise will usually dwarf anything you'd save on cappuccinos.","Don't beat yourself up about the little things."]},
 {id:"l-site", topic:"Engineering", title:"Site safety briefing", lines:[
  ["A","Good morning, everyone. Before we get cracking, a few points about today's work on the east side of the site."],
  ["A","The crane will be lifting steel beams from half past nine until roughly midday. During that time, the area marked with red barriers is strictly off limits. No exceptions, no shortcuts."],
  ["A","Secondly, the scaffolding on level three has been inspected and signed off, but the section near the stairwell is still awaiting a final check. Please don't use it until you see the green tag."],
  ["A","And finally, it's forecast to be quite blustery this afternoon. If the wind speed exceeds the limit, lifting will be suspended, so be prepared for the schedule to slip a little. Any questions? Right, let's crack on and stay safe."]],
  q:[
   {q:"When will the crane be operating?", o:["All day","From 9.30 until about 12","Only in the afternoon","From 8 until 10"], a:1},
   {q:"What should workers do about the scaffolding near the stairwell?", o:["Use it carefully","Wait for the green tag","Remove it","Report it to the police"], a:1},
   {q:"Why might the schedule change?", o:["Rain","High winds","A late delivery","A strike"], a:1},
   {q:"'Let's crack on' means…", o:["let's break something","let's get started / continue working","let's take a break","let's go home"], a:1}],
  dict:["The area marked with red barriers is strictly off limits.","Be prepared for the schedule to slip a little."]}
];

/* Writing — Cambridge C1/C2 tasks */
BANK.writing = [
 {id:"w-essay-remote", type:"Essay", level:"C1", words:"220–260", prompt:"Your class has had a discussion about the future of work. Write an essay discussing TWO of the factors below and explain which you think will have the greater impact. Give reasons.\n\n• remote working\n• artificial intelligence\n• the four-day week\n\nNotes from the discussion: \"You can't build a team culture on video calls.\" / \"AI will replace tasks, not jobs.\" / \"Productivity is about results, not hours.\""},
 {id:"w-proposal-training", type:"Proposal", level:"C1", words:"220–260", prompt:"Your company wants to improve the way new engineers are trained. Your manager has asked you to write a proposal explaining the weaknesses of the current induction process, suggesting improvements and explaining how these would benefit the company."},
 {id:"w-report-project", type:"Report", level:"C1", words:"220–260", prompt:"You recently managed a project that finished late and over budget. Write a report for senior management describing what went wrong, what lessons have been learnt and recommending how future projects could be managed more effectively."},
 {id:"w-review-book", type:"Review", level:"C1", words:"220–260", prompt:"A personal-development website is inviting readers to review a book, podcast or course that has changed the way they work or think. Write a review describing it, explaining what you learnt and saying who would benefit most from it."},
 {id:"w-email-complaint", type:"Formal email", level:"C1", words:"220–260", prompt:"You recently attended a professional conference in London that was poorly organised (late sessions, cancelled speakers, overcrowded rooms). Write an email to the organisers explaining the problems, the impact they had on you and what you expect them to do."},
 {id:"w-article-sport", type:"Article", level:"C2", words:"280–320", prompt:"An online magazine is running a series called 'Lessons from Sport'. Write an article explaining what managers in business can learn from the way successful sports teams are run. Include specific examples."},
 {id:"w-letter-mentor", type:"Letter", level:"C2", words:"280–320", prompt:"A younger colleague has written to you asking for advice on how to move from a technical role into project management. Write a letter giving your advice, describing the skills they will need and warning them about common pitfalls."}
];

/* Real British audio/video to explore (link out) */
BANK.links = [
  {t:"BBC Learning English — 6 Minute English", d:"Short British-English discussions with vocabulary. Great daily habit.", u:"https://www.bbc.co.uk/learningenglish/english/features/6-minute-english"},
  {t:"BBC Sounds", d:"Radio 4 & 5 Live podcasts: business, science, football. Real native speed.", u:"https://www.bbc.co.uk/sounds"},
  {t:"BBC Learning English on YouTube", d:"Videos on pronunciation, idioms and news English.", u:"https://www.youtube.com/@bbclearningenglish"},
  {t:"Cambridge English — C1 Advanced", d:"Official exam format and free sample papers.", u:"https://www.cambridgeenglish.org/exams-and-tests/qualifications/advanced/"},
  {t:"Cambridge English — C2 Proficiency", d:"Official C2 format and sample papers.", u:"https://www.cambridgeenglish.org/exams-and-tests/qualifications/proficiency/"},
  {t:"The Guardian — Football", d:"Match reports and opinion in British English.", u:"https://www.theguardian.com/football"},
  {t:"BBC News — Business", d:"Daily business and economy news.", u:"https://www.bbc.co.uk/news/business"},
  {t:"BBC News — Technology", d:"Engineering, AI and tech stories.", u:"https://www.bbc.co.uk/news/technology"}
];
