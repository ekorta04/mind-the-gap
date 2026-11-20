/* ===== C1 ADVANCED · modelo del examen, temario y bancos de apoyo =====
   Contenido original escrito para esta app. Fuentes de los datos del examen:
   - Formato: cambridgeenglish.org/exams-and-tests/advanced/exam-format/
   - Conversión de notas de práctica: "Converting practice test scores to Cambridge English Scale scores" (Cambridge, 2019)
   - Fechas en papel 2027: cambridgeenglish.org/exams-and-tests/qualifications/exam-dates/ */
const C1 = {};

/* Notas: puntos directos de un examen OFICIAL de práctica → Cambridge English Scale.
   Anclas oficiales (142, 160, 180, 200); el máximo se asocia a 210. Entre anclas se interpola. */
C1.AREAS = {
  reading:  {n:"Reading", max:50, pts:[[17,142],[23,160],[32,180],[43,200],[50,210]], parts:"Parts 1, 5, 6, 7, 8"},
  uoe:      {n:"Use of English", max:28, pts:[[8,142],[11,160],[16,180],[23,200],[28,210]], parts:"Parts 2, 3, 4"},
  writing:  {n:"Writing", max:40, pts:[[10,142],[16,160],[24,180],[34,200],[40,210]], parts:"2 texts × 20"},
  listening:{n:"Listening", max:30, pts:[[11,142],[13,160],[18,180],[26,200],[30,210]], parts:"4 parts, 30 questions"},
  speaking: {n:"Speaking", max:75, pts:[[17,142],[30,160],[45,180],[66,200],[75,210]], parts:"4 parts, in pairs"}
};
C1.PASS = 180; C1.TARGET = 190;
/* Semáforo de la decisión (media de los dos últimos simulacros oficiales completos).
   Cambridge avisa de que una nota de práctica a unos 3 puntos de un umbral no es fiable. */
C1.GREEN = 186; C1.AMBER = 181;
C1.DECIDE_DAYS = 14;   // la decisión se abre 14 días antes del plazo de inscripción del centro

/* Partes de cada destreza para introducir las notas parte por parte.
   q = preguntas (o puntos máximos si pts), w = puntos por acierto. */
C1.PARTS = {
  reading:  [{k:"r1", n:"Part 1", q:8, w:1}, {k:"r5", n:"Part 5", q:6, w:2}, {k:"r6", n:"Part 6", q:4, w:2}, {k:"r7", n:"Part 7", q:6, w:2}, {k:"r8", n:"Part 8", q:10, w:1}],
  uoe:      [{k:"u2", n:"Part 2", q:8, w:1}, {k:"u3", n:"Part 3", q:8, w:1}, {k:"u4", n:"Part 4", q:12, w:1, pts:true}],
  writing:  [{k:"w1", n:"Part 1 · essay", q:20, w:1, pts:true}, {k:"w2", n:"Part 2", q:20, w:1, pts:true}],
  listening:[{k:"l1", n:"Part 1", q:6, w:1}, {k:"l2", n:"Part 2", q:8, w:1}, {k:"l3", n:"Part 3", q:6, w:1}, {k:"l4", n:"Part 4", q:10, w:1}],
  speaking: [{k:"s", n:"Total", q:75, w:1, pts:true}]
};
/* Pruebas del examen (se pueden hacer en días distintos) y catálogo de exámenes oficiales.
   Solo nombre y fuente: el contenido está en la web de Cambridge o en los libros. */
C1.COMPONENTS = {rue:{n:"Reading & Use of English", areas:["reading", "uoe"]}, writing:{n:"Writing", areas:["writing"]}, listening:{n:"Listening", areas:["listening"]}, speaking:{n:"Speaking", areas:["speaking"]}};
C1.MOCK_PAPERS = [
  {id:"dig1", n:"Digital sample test 1", src:"Cambridge website · free", free:true},
  {id:"ps1", n:"Paper-based sample 1", src:"Cambridge website · free", free:true},
  {id:"ps2", n:"Paper-based sample 2", src:"Cambridge website · free", free:true},
  ...[1, 2, 3, 4].map(i => ({id:"a5t" + i, n:"C1 Advanced 5 · Test " + i, src:"Authentic Practice Tests (Cambridge, 2025)"})),
  ...[1, 2, 3, 4].map(i => ({id:"a4t" + i, n:"C1 Advanced 4 · Test " + i, src:"Authentic Practice Tests (Cambridge, 2021)"}))
];
C1.DEFAULT_EXAM = "2027-05-08";
C1.PAPER_DATES = ["2027-05-08", "2027-05-11", "2027-05-15", "2027-06-05", "2027-06-09", "2027-06-19", "2027-06-26"];
C1.LINKS = {
  samples:"https://www.cambridgeenglish.org/exams-and-tests/advanced/preparation/",
  format:"https://www.cambridgeenglish.org/exams-and-tests/advanced/exam-format/",
  dates:"https://www.cambridgeenglish.org/exams-and-tests/qualifications/exam-dates/"
};
C1.FORMAT = [
  ["Reading and Use of English", "90 min · 8 parts · 56 questions"],
  ["Writing", "90 min · 2 texts of 220–260 words (essay + one of letter/email, proposal, report, review)"],
  ["Listening", "about 40 min · 4 parts · 30 questions · each recording is played twice"],
  ["Speaking", "15 min in pairs · 4 parts"]
];

/* Plan semanal por defecto (0 = domingo). Editable en Ajustes. */
C1.WEEK = {1:"reading", 2:"listening", 3:"writing", 4:"rewrite", 5:"speaking", 6:"uoe", 0:"rest"};
C1.BLOCKS = {
  reading:{n:"Reading part", s:"One text with questions, on the clock"},
  listening:{n:"Listening part", s:"Listen twice, answer, then transcript and dictation"},
  writing:{n:"Full writing by hand", s:"45 min on paper · replaces the normal session"},
  rewrite:{n:"Rewrite with feedback", s:"Rewrite your last marked text"},
  speaking:{n:"Speaking 4/3/2", s:"Same topic in 4, 3 and 2 minutes"},
  uoe:{n:"Use of English Parts 1–4", s:"30 questions · 35 minutes"},
  rest:{n:"Rest day", s:"Just the 5-minute mix, or nothing"}
};

/* ===== Temario C1: un punto nuevo por sesión =====
   es = explicación · trap = error típico de hispanohablante · ex = ejemplos completos y correctos (se ven ANTES de practicar) */
C1.POINTS = [
{id:"inv-neg", t:"Inversion after negative adverbials", es:"Cuando la frase empieza con un adverbio negativo o restrictivo (never, rarely, not only, no sooner, hardly, under no circumstances, not until, little), el auxiliar va delante del sujeto, como en una pregunta. Es formal y da puntos en Writing.", trap:"En español no se invierte nada: «Nunca había visto…». En inglés hace falta auxiliar + sujeto: Never had I seen…, no «Never I had seen».", ex:["Never have I seen such a well-run site.", "Not only did they miss the deadline, but they also went over budget.", "Hardly had we started when the alarm went off."], items:[
 {_t:"kwt", s1:"As soon as the race started, it began to rain.", key:"SOONER", pre:"No", post:"it began to rain.", a:["sooner had the race started than"], why:"No sooner + had + subject + past participle + than."},
 {_t:"kwt", s1:"You must not switch off this pump under any circumstances.", key:"SHOULD", pre:"Under no circumstances", post:"switched off.", a:["should this pump be"], why:"Under no circumstances + modal + subject."},
 {_t:"oc", s:"Not until the audit was over ___ we realise how serious the problem was.", a:["did"], why:"Not until… + did + subject + infinitive."},
 {_t:"oc", s:"Little ___ they know that the client was about to cancel the contract.", a:["did"], why:"Little did they know = no tenían ni idea."}]},
{id:"inv-cond", t:"Inverted conditionals: Had, Should, Were", es:"En registro formal se puede quitar «if» e invertir: Had I known (= If I had known), Should you need (= If you need), Were we to accept (= If we accepted). Muy útil en cartas, informes y propuestas.", trap:"No mezcles las dos formas: «If had I known» es incorrecto. O «If I had known» o «Had I known».", ex:["Had I known about the delay, I would have warned the client.", "Should you require any further information, please do not hesitate to contact me.", "Were we to postpone the launch, we would lose the contract."], items:[
 {_t:"kwt", s1:"If you need any help, call the site office.", key:"SHOULD", pre:"", post:"any help, call the site office.", a:["should you need"], why:"Should + subject + infinitive = if… (formal)."},
 {_t:"kwt", s1:"If the engineer hadn't spotted the crack, the bridge might have collapsed.", key:"NOT", pre:"Had", post:"the crack, the bridge might have collapsed.", a:["the engineer not spotted"], why:"Had + subject + not + past participle (no contraction)."},
 {_t:"oc", s:"___ the company to go bankrupt, hundreds of jobs would be lost.", a:["were"], why:"Were + subject + to-infinitive = if… (hypothetical)."},
 {_t:"gram", s:"___ I known the road was closed, I would have left earlier.", o:["Had", "If", "Should", "Would"], a:0, why:"Had I known = If I had known."}]},
{id:"mixed-cond", t:"Mixed conditionals", es:"Mezclan tiempos: condición pasada con resultado presente (If I had studied engineering, I would be a designer now) o condición permanente con resultado pasado (If I were more patient, I wouldn't have shouted).", trap:"Nunca «would» en la parte del if: «If I would have known» es incorrecto → If I had known.", ex:["If we had signed the contract last year, we would be much better off now.", "If she weren't so stubborn, she would have accepted the offer.", "If I had taken that job in Germany, I would speak German by now."], items:[
 {_t:"gram", s:"If he had listened to the forecast, he ___ stuck in the snow right now.", o:["wouldn't be", "wouldn't have been", "won't be", "isn't"], a:0, why:"Past condition → present result: would + infinitive."},
 {_t:"gram", s:"If I ___ afraid of heights, I would have gone up the tower with you.", o:["weren't", "hadn't been", "wouldn't be", "am not"], a:0, why:"Permanent state (were) → past result (would have gone)."},
 {_t:"kwt", s1:"She didn't save any money, so she can't afford the trip now.", key:"ABLE", pre:"If she had saved some money, she", post:"afford the trip now.", a:["would be able to"], why:"Past condition, present result: would be able to."},
 {_t:"oc", s:"If the team had tested the software properly, we wouldn't ___ dealing with all these complaints today.", a:["be"], why:"Result now and in progress: wouldn't be + -ing."}]},
{id:"wish-regret", t:"Wish, if only, would rather, it's time", es:"Después de wish / if only / would rather (+ otra persona) / it's (high) time, el verbo retrocede un tiempo: presente irreal → past simple; pasado → past perfect. Para quejarte de lo que hace otro: wish + would.", trap:"«I wish I would have» y «I'd rather you don't» son incorrectos → I wish I had…, I'd rather you didn't…", ex:["I wish I had applied for that position.", "I'd rather you didn't mention this to the client.", "It's high time we updated the safety procedures."], items:[
 {_t:"kwt", s1:"I regret not accepting the job in Munich.", key:"WISH", pre:"I", post:"the job in Munich.", a:["wish i had accepted"], why:"Regret about the past: wish + past perfect."},
 {_t:"kwt", s1:"Please don't smoke in the workshop.", key:"RATHER", pre:"I", post:"smoke in the workshop.", a:["would rather you did not", "would rather you didn't"], why:"Would rather + person + past simple."},
 {_t:"oc", s:"It's high time the government ___ something about housing costs.", a:["did"], why:"It's high time + past simple."},
 {_t:"gram", s:"If only I ___ how to fix it, I wouldn't have to call the supplier.", o:["knew", "know", "had known", "would know"], a:0, why:"Unreal present: if only + past simple."}]},
{id:"modal-perfect", t:"Modal perfects: deduction and criticism", es:"Modal + have + participio para hablar del pasado. Deducción: must have (seguro que sí), can't/couldn't have (seguro que no), may/might have (quizá). Crítica o arrepentimiento: should have, ought to have. Innecesario pero hecho: needn't have.", trap:"«Must have» no es obligación en pasado (eso es «had to»). Y «mustn't have» no se usa para deducir: can't have.", ex:["The valve must have been leaking for weeks.", "You should have told me before the meeting.", "We needn't have hurried; the flight was delayed."], items:[
 {_t:"kwt", s1:"I'm sure the technician forgot to close the valve.", key:"MUST", pre:"The technician", post:"to close the valve.", a:["must have forgotten"], why:"Certainty about the past: must have + past participle."},
 {_t:"kwt", s1:"It wasn't necessary for you to print the report, but you did.", key:"NEED", pre:"You", post:"the report.", a:["need not have printed", "needn't have printed"], why:"Needn't have done = it was done, but it was unnecessary."},
 {_t:"gram", s:"She ___ the email; she was in the air when it was sent.", o:["can't have read", "mustn't have read", "shouldn't have read", "needn't have read"], a:0, why:"Negative deduction about the past: can't have."},
 {_t:"oc", s:"You ___ to have checked the figures before sending them to the client.", a:["ought"], why:"Ought to have + past participle = should have."}]},
{id:"passive-report", t:"Impersonal and reporting passives", es:"Para informar sin decir quién lo dice: It is said that… o Sujeto + is said/believed/thought/reported + to-infinitive. Si la acción es anterior: to have + participio. Muy propio de essays e informes.", trap:"No traduzcas «se dice que el proyecto está…» como «It says that». Usa It is said that… o The project is said to be…", ex:["The new tunnel is expected to open next spring.", "The driver is thought to have lost control on the final lap.", "It is widely believed that remote work is here to stay."], items:[
 {_t:"kwt", s1:"People say the company is planning to cut 200 jobs.", key:"SAID", pre:"The company", post:"planning to cut 200 jobs.", a:["is said to be"], why:"Subject + is said + to be + -ing."},
 {_t:"kwt", s1:"Experts believe that the fire started in the storeroom.", key:"HAVE", pre:"The fire is", post:"in the storeroom.", a:["believed to have started"], why:"Earlier action: to have + past participle."},
 {_t:"oc", s:"___ is estimated that the works will take three years to complete.", a:["it"], why:"It + passive reporting verb + that."},
 {_t:"gram", s:"The suspect is reported ___ the country last night.", o:["to have left", "to leave", "leaving", "that he left"], a:0, why:"Past action reported now: to have left."}]},
{id:"causative", t:"Causative: have / get something done", es:"Cuando otra persona hace algo por ti: have/get + objeto + participio (I had my car serviced). También para algo desagradable que te pasa (He had his phone stolen). Get somebody TO do; have somebody do.", trap:"«I cut my hair yesterday» significa que te lo cortaste tú. Si fuiste a la peluquería: I had my hair cut.", ex:["We're having the fire alarms tested on Friday.", "She got the contract checked by a lawyer.", "I'll get the supplier to send a replacement."], items:[
 {_t:"kwt", s1:"A specialist firm is going to inspect our lifts next week.", key:"HAVING", pre:"We are", post:"by a specialist firm next week.", a:["having our lifts inspected"], why:"Have + object + past participle."},
 {_t:"kwt", s1:"Someone broke into their office during the holidays.", key:"HAD", pre:"They", post:"into during the holidays.", a:["had their office broken"], why:"Have something done for an unpleasant event."},
 {_t:"oc", s:"I'll get the electrician ___ have a look at the panel this afternoon.", a:["to"], why:"Get somebody TO do something."},
 {_t:"gram", s:"You really should ___ before the inspection.", o:["have the brakes checked", "have checked the brakes by a mechanic", "check the brakes done", "have the brakes check"], a:0, why:"Have + object + past participle."}]},
{id:"cleft", t:"Cleft sentences for emphasis", es:"Para destacar una parte de la frase: What + cláusula + is/was… (What worries me is the cost) o It is/was… that/who… (It was the supplier who caused the delay). Dan variedad y control en Writing.", trap:"No digas «What worries me it is the cost» ni olvides el «that/who» tras It was…", ex:["What we need is a realistic schedule.", "It was the weather that forced us to stop.", "All I want is a straight answer."], items:[
 {_t:"kwt", s1:"The lack of communication annoyed me most.", key:"WHAT", pre:"", post:"was the lack of communication.", a:["what annoyed me most"], why:"What + clause + was + noun phrase."},
 {_t:"kwt", s1:"Maria found the error, not the auditor.", key:"WHO", pre:"It", post:"the error, not the auditor.", a:["was maria who found"], why:"It was + person + who + verb."},
 {_t:"oc", s:"___ I did was ask a simple question, and he lost his temper.", a:["all"], why:"All I did was + bare infinitive = lo único que hice fue…"},
 {_t:"oc", s:"It wasn't until the third lap ___ the leader made a mistake.", a:["that"], why:"It was(n't) until… that…"}]},
{id:"ger-inf", t:"Gerund or infinitive: verbs that change meaning", es:"remember/forget/regret + -ing miran al pasado; + to-infinitive miran a lo que hay que hacer. stop -ing = dejar de; stop to = pararse para. try -ing = probar; try to = intentar. Y ojo con «to» preposición: look forward to, object to, be used to + -ing.", trap:"«I look forward to hear from you» es el error número uno en cartas → I look forward to hearing from you.", ex:["I regret to inform you that your application was unsuccessful.", "I don't remember signing that form.", "She objected to being moved to another team."], items:[
 {_t:"gram", s:"I look forward to ___ from you at your earliest convenience.", o:["hearing", "hear", "be hearing", "have heard"], a:0, why:"Look forward to + -ing: «to» es preposición."},
 {_t:"gram", s:"He stopped ___ the gauge because he thought he'd seen a leak.", o:["to check", "checking", "check", "to checking"], a:0, why:"Stop + to-infinitive = se paró para hacerlo."},
 {_t:"kwt", s1:"I wish I hadn't said that to the director.", key:"REGRET", pre:"I", post:"to the director.", a:["regret saying that", "regret having said that"], why:"Regret + -ing for something already done."},
 {_t:"oc", s:"The residents objected ___ being asked to pay for the repairs.", a:["to"], why:"Object to + -ing."}]},
{id:"dep-prep", t:"Dependent prepositions", es:"Muchos verbos, adjetivos y nombres exigen una preposición fija, y rara vez coincide con la española: depend on, insist on, succeed in, consist of, capable of, responsible for, prevent from, an increase in, the reason for.", trap:"depend of ✗ → depend on · consist in ✗ → consist of · responsible of ✗ → responsible for · married with ✗ → married to.", ex:["The outcome depends on how quickly we react.", "She succeeded in convincing the board.", "There has been a sharp rise in energy costs."], items:[
 {_t:"oc", s:"The team consists ___ four engineers and two technicians.", a:["of"], why:"Consist of."},
 {_t:"oc", s:"Bad weather prevented the crew ___ finishing the roof on time.", a:["from"], why:"Prevent somebody from + -ing."},
 {_t:"oc", s:"Who is responsible ___ maintaining the fire extinguishers?", a:["for"], why:"Responsible for + -ing."},
 {_t:"gram", s:"There has been a significant increase ___ the number of accidents.", o:["in", "of", "on", "at"], a:0, why:"An increase/rise/fall IN something."}]},
{id:"linkers", t:"Formal linkers: contrast and cause", es:"despite / in spite of + nombre o -ing (nunca frase con sujeto); although / even though + frase; however, nevertheless al empezar frase y con coma; whereas para contrastar dos hechos; owing to / due to + nombre.", trap:"«Despite of» no existe. «Despite he was tired» tampoco → Despite being tired / Although he was tired.", ex:["Despite having little experience, she ran the project brilliantly.", "The first proposal is cheaper, whereas the second is far more reliable.", "The match was called off owing to heavy rain."], items:[
 {_t:"kwt", s1:"Although the budget was tight, the team delivered on time.", key:"SPITE", pre:"The team delivered on time", post:"tight budget.", a:["in spite of the", "in spite of a", "in spite of their"], why:"In spite of + noun phrase."},
 {_t:"kwt", s1:"He was exhausted but he carried on working.", key:"FACT", pre:"He carried on working", post:"he was exhausted.", a:["despite the fact that", "in spite of the fact that"], why:"Despite the fact that + clause."},
 {_t:"oc", s:"The flight was cancelled ___ to a technical fault.", a:["owing", "due"], why:"Owing to / due to + noun."},
 {_t:"gram", s:"Sales rose sharply in the north, ___ in the south they remained flat.", o:["whereas", "despite", "however", "nevertheless"], a:0, why:"Whereas joins two contrasting clauses in one sentence."}]},
{id:"participle", t:"Participle clauses", es:"Sirven para condensar: Having + participio (acción anterior), -ing (acción simultánea o causa), participio pasado (sentido pasivo). El sujeto de las dos partes debe ser el mismo.", trap:"«Walking down the street, the rain started» está mal: la lluvia no camina. El sujeto ha de coincidir.", ex:["Having reviewed the figures, we recommend option B.", "Faced with rising costs, the firm decided to relocate.", "Not knowing the area, I asked for directions."], items:[
 {_t:"kwt", s1:"Because he had worked there for years, he knew everyone.", key:"HAVING", pre:"", post:"for years, he knew everyone.", a:["having worked there"], why:"Having + past participle for the earlier action or the cause."},
 {_t:"gram", s:"___ in 1890, the bridge is still in daily use.", o:["Built", "Building", "Having built", "To build"], a:0, why:"Past participle = passive meaning (it was built)."},
 {_t:"gram", s:"___ how to respond, he said nothing at all.", o:["Not knowing", "Not known", "Didn't know", "Not to know"], a:0, why:"Negative -ing clause expressing cause."},
 {_t:"oc", s:"___ been warned about the risks, they decided to go ahead anyway.", a:["having"], why:"Having been + past participle (perfect passive)."}]},
{id:"subjunctive", t:"Formal subjunctive: suggest, recommend, insist", es:"Tras suggest, recommend, insist, demand, propose y expresiones como It is essential/vital that… se usa el verbo en forma base (o should + infinitivo), sin -s ni pasado: I suggest that he attend. Imprescindible en proposals y reports.", trap:"«I suggest you to do» y «I recommend him to go» son incorrectos → I suggest (that) you do / I recommend that he go / I recommend going.", ex:["I recommend that the system be replaced.", "It is essential that every visitor wear a helmet.", "The committee proposed that the fee should be reduced."], items:[
 {_t:"gram", s:"The auditor recommended that the procedure ___ reviewed immediately.", o:["be", "is", "was", "would be"], a:0, why:"Subjunctive: base form «be»."},
 {_t:"gram", s:"I suggest ___ the meeting until all the data is available.", o:["postponing", "to postpone", "us to postpone", "that we postponing"], a:0, why:"Suggest + -ing (or that + clause), never + to-infinitive."},
 {_t:"kwt", s1:"\"You really must see a specialist,\" the doctor told him.", key:"INSISTED", pre:"The doctor", post:"a specialist.", a:["insisted that he see", "insisted that he should see", "insisted he see", "insisted on him seeing", "insisted on his seeing"], why:"Insist that + subject + base form, or insist on + -ing."},
 {_t:"oc", s:"It is vital that everyone ___ informed of the new evacuation route.", a:["be", "is"], why:"Formal subjunctive «be» (BrE also accepts «is»)."}]},
{id:"compar", t:"Advanced comparatives", es:"the + comparativo…, the + comparativo (cuanto más…, más…); nowhere near as… as; by far the + superlativo; far/considerably/slightly + comparativo; not nearly as… as.", trap:"«The more you practise, more you improve» ✗: hacen falta los dos «the». Y «more easy» ✗ → easier.", ex:["The longer we wait, the more expensive it will become.", "This model is nowhere near as reliable as the old one.", "It was by far the toughest race of the season."], items:[
 {_t:"kwt", s1:"If you practise more, you will make fewer mistakes.", key:"FEWER", pre:"The more you practise,", post:"you will make.", a:["the fewer mistakes"], why:"The + comparative…, the + comparative."},
 {_t:"kwt", s1:"The second half was much less exciting than the first.", key:"NEAR", pre:"The second half was", post:"exciting as the first.", a:["nowhere near as", "nowhere near so"], why:"Nowhere near as + adjective + as."},
 {_t:"oc", s:"This is ___ far the most efficient solution we have considered.", a:["by"], why:"By far + superlative."},
 {_t:"gram", s:"The new process is ___ faster than the one it replaced.", o:["considerably", "very", "more", "so"], a:0, why:"Considerably/far/much + comparative; «very» cannot modify a comparative."}]},
{id:"wf-neg", t:"Word formation: negative prefixes", es:"El prefijo depende de la palabra: un- (unreliable), in- (inaccurate), im- delante de p/m (impractical, immature), ir- delante de r (irrelevant), il- delante de l (illegal), dis- (dishonest, disagree), mis- = mal hecho (misunderstand). En Part 3 comprueba siempre si el contexto pide negativo.", trap:"Quedarse en la palabra positiva cuando el contexto es negativo es el fallo más frecuente de Part 3. Lee la frase entera.", ex:["The data proved to be highly inaccurate.", "It would be irresponsible to ignore the warning.", "There was a misunderstanding about the delivery date."], items:[
 {_t:"wf", s:"The instructions were so ___ that nobody knew where to start.", stem:"LOGIC", a:["illogical"], why:"il- before l + -al."},
 {_t:"wf", s:"It is highly ___ that the work will be finished before winter.", stem:"LIKELY", a:["unlikely"], why:"un- + likely; «highly unlikely» is a fixed collocation."},
 {_t:"wf", s:"Much of the report was ___ to the question we had asked.", stem:"RELEVANCE", a:["irrelevant"], why:"ir- before r; noun → adjective."},
 {_t:"wf", s:"The supplier was accused of ___ the public about the product's safety.", stem:"LEAD", a:["misleading"], why:"mis- + lead + -ing after a preposition."}]},
{id:"wf-noun", t:"Word formation: abstract nouns", es:"Sufijos de nombre: -ity (flexibility), -ness (awareness), -ance/-ence (reliance, existence), -ment (improvement), -ship (leadership), -th con cambio de vocal (strength, depth, width, growth), -al (approval, refusal), -ure (failure, pressure).", trap:"Ojo con la ortografía: maintain → maintenance (no «maintainance»), pronounce → pronunciation, explain → explanation.", ex:["The depth of the foundations surprised the inspectors.", "Her refusal to compromise delayed the agreement.", "Regular maintenance reduces the risk of failure."], items:[
 {_t:"wf", s:"The ___ of the river at this point makes a bridge impractical.", stem:"WIDE", a:["width"], why:"wide → width (vowel change)."},
 {_t:"wf", s:"Poor ___ of the equipment was blamed for the breakdown.", stem:"MAINTAIN", a:["maintenance"], why:"maintain → maintenance (spelling change)."},
 {_t:"wf", s:"There is a growing ___ on renewable sources of energy.", stem:"RELY", a:["reliance"], why:"rely → reliance (y → i)."},
 {_t:"wf", s:"The board gave its ___ to the plan after a long debate.", stem:"APPROVE", a:["approval"], why:"approve → approval."}]},
{id:"wf-adj", t:"Word formation: adjectives, adverbs and double changes", es:"Adjetivos: -able/-ible, -ive, -ous, -al, -ful/-less. Adverbios: -ly (con -ically tras -ic). En C1 suelen pedir dos cambios a la vez: prefijo + sufijo (unpredictable), o adjetivo → adverbio negativo (unexpectedly).", trap:"Mira qué hay alrededor del hueco: delante de adjetivo o verbo casi siempre adverbio; tras artículo, nombre.", ex:["The results were unexpectedly positive.", "It was an economically sensible decision.", "The outcome is entirely unpredictable."], items:[
 {_t:"wf", s:"The new engine is ___ more efficient than its predecessor.", stem:"SIGNIFY", a:["significantly"], why:"signify → significant → significantly (adverb before comparative)."},
 {_t:"wf", s:"Weather on the mountain is notoriously ___ at this time of year.", stem:"PREDICT", a:["unpredictable"], why:"un- + predict + -able."},
 {_t:"wf", s:"The scheme proved ___ successful, far beyond what anyone had hoped.", stem:"EXPECT", a:["unexpectedly"], why:"un- + expected + -ly (adverb before adjective)."},
 {_t:"wf", s:"She gave a very ___ presentation that won over the investors.", stem:"PERSUADE", a:["persuasive"], why:"persuade → persuasive."}]},
{id:"colloc", t:"Core collocations: make, do, take, have, pay, meet, raise", es:"El inglés elige el verbo por costumbre, no por lógica: make a decision / a mistake / progress; do research / business / damage; take responsibility / action / measures; have an impact; pay attention; meet a deadline / requirements; raise an issue / awareness; reach an agreement.", trap:"make a photo ✗ (take) · do a mistake ✗ (make) · make a party ✗ (have/throw) · do an effort ✗ (make) · take a decision es posible, pero make es lo normal.", ex:["We need to take action before the situation gets worse.", "The team worked overnight to meet the deadline.", "The new law will have a major impact on small firms."], items:[
 {_t:"oc", s:"The campaign aims to ___ awareness of safety at work.", a:["raise"], why:"Raise awareness."},
 {_t:"oc", s:"After six hours of talks, the two sides finally ___ an agreement.", a:["reached"], why:"Reach an agreement."},
 {_t:"mc", s:"Nobody was willing to ___ responsibility for the error.", o:["take", "make", "do", "put"], a:0, why:"Take responsibility for."},
 {_t:"mc", s:"The storm ___ considerable damage to the roof.", o:["did", "made", "took", "had"], a:0, why:"Do damage (also cause damage)."}]},
{id:"phrasal3", t:"Three-part phrasal verbs", es:"Verbo + adverbio + preposición, inseparables: come up with (idear), put up with (aguantar), run out of (quedarse sin), get round to (encontrar tiempo para), face up to (afrontar), make up for (compensar), look down on (despreciar), live up to (estar a la altura de).", trap:"Detrás va siempre nombre o -ing: «I never got round to reply» ✗ → got round to replying.", ex:["She came up with a brilliant solution.", "I can't put up with the noise any longer.", "The film didn't live up to my expectations."], items:[
 {_t:"kwt", s1:"I can no longer tolerate his constant lateness.", key:"PUT", pre:"I can no longer", post:"his constant lateness.", a:["put up with"], why:"Put up with = tolerate."},
 {_t:"kwt", s1:"We have no printer paper left.", key:"RUN", pre:"We have", post:"printer paper.", a:["run out of"], why:"Run out of = have none left."},
 {_t:"oc", s:"Nothing can make up ___ the time we lost at the start of the project.", a:["for"], why:"Make up for = compensate for."},
 {_t:"oc", s:"I still haven't got ___ to answering last week's emails.", a:["round", "around"], why:"Get round to + -ing."}]},
{id:"false-fr", t:"False friends for Spanish speakers", es:"actually = en realidad (actualmente = currently); eventually = al final (eventualmente = possibly); attend = asistir (assist = ayudar); sensible = sensato (sensible = sensitive); career = trayectoria profesional (carrera universitaria = degree); argument = discusión; realise = darse cuenta (realizar = carry out).", trap:"«Actually I work in Serveo» no significa «actualmente». Di: I currently work at…", ex:["I currently work as a project manager.", "We eventually found the fault after three days.", "Over 200 people attended the conference."], items:[
 {_t:"mc", s:"The company is ___ recruiting ten new technicians.", o:["currently", "actually", "eventually", "lately"], a:0, why:"Currently = actualmente."},
 {_t:"mc", s:"It was a very ___ decision to check the wiring before switching it on.", o:["sensible", "sensitive", "sensitised", "sensational"], a:0, why:"Sensible = sensato."},
 {_t:"mc", s:"The inspection was ___ out by an independent body.", o:["carried", "realised", "made", "taken"], a:0, why:"Carry out an inspection (not «realise»)."},
 {_t:"oc", s:"After months of delays, the stadium was ___ opened in March.", a:["eventually", "finally"], why:"Eventually = al final."}]},
{id:"articles", t:"Articles and uncountable nouns", es:"Incontables sin plural ni «a/an»: advice, information, equipment, research, furniture, progress, knowledge, feedback, evidence, software. Para contar: a piece of advice. Sin artículo al generalizar (Life is hard; Engineers need…), con «the» para algo concreto ya identificado.", trap:"informations ✗ · an advice ✗ · equipments ✗ · researches ✗ · «The people think that…» al generalizar ✗ → People think…", ex:["She gave me a useful piece of advice.", "Research shows that sleep affects performance.", "The equipment we ordered has finally arrived."], items:[
 {_t:"gram", s:"Could you give me ___ on how to prepare for the interview?", o:["some advice", "an advice", "some advices", "any advices"], a:0, why:"Advice is uncountable."},
 {_t:"gram", s:"___ suggests that teams work better with clear goals.", o:["Research", "A research", "The researches", "Researches"], a:0, why:"Research is uncountable and takes no article in general statements."},
 {_t:"oc", s:"Let me give you a ___ of advice: always read the contract twice.", a:["piece", "bit", "word"], why:"A piece/bit/word of advice."},
 {_t:"gram", s:"We need to buy ___ for the new laboratory.", o:["new equipment", "a new equipment", "new equipments", "some new equipments"], a:0, why:"Equipment is uncountable."}]},
{id:"so-such", t:"So, such, too, enough and emphatic inversion", es:"so + adjetivo/adverbio + that; such + (a) + adjetivo + nombre + that; too + adjetivo + to; adjetivo + enough + to. En formal, se invierte: So severe was the storm that… / Such was the demand that…", trap:"«It was so good film» ✗ → such a good film. «Enough big» ✗ → big enough.", ex:["It was such a complex job that we had to hire specialists.", "So great was the demand that the website crashed.", "The beam wasn't strong enough to bear the load."], items:[
 {_t:"kwt", s1:"The noise was so loud that we had to stop the meeting.", key:"SUCH", pre:"There was", post:"that we had to stop the meeting.", a:["such a loud noise", "such loud noise"], why:"Such + (a) + adjective + noun."},
 {_t:"kwt", s1:"The box was too heavy for me to lift.", key:"ENOUGH", pre:"I wasn't", post:"the box.", a:["strong enough to lift"], why:"Adjective + enough + to-infinitive."},
 {_t:"oc", s:"___ was the force of the explosion that windows broke two streets away.", a:["such"], why:"Such was + noun phrase + that (formal inversion)."},
 {_t:"oc", s:"So quickly ___ the fire spread that the building had to be evacuated.", a:["did"], why:"So + adverb + auxiliary + subject."}]},
{id:"relatives", t:"Relative clauses with quantifiers and prepositions", es:"En formal, la preposición va delante del relativo: the company for which I work, the way in which… Con cantidades: most of whom, both of which, none of which, some of whose. «whereby» = mediante el cual.", trap:"Tras preposición nunca «that» ni «who»: «the people with who» ✗ → with whom; «in that» ✗ → in which.", ex:["We interviewed ten candidates, most of whom were highly qualified.", "They proposed two designs, neither of which met the brief.", "This is the stage at which most projects fail."], items:[
 {_t:"oc", s:"The firm employs 300 people, many of ___ work remotely.", a:["whom"], why:"Quantifier + of whom (people)."},
 {_t:"oc", s:"She suggested three dates, none of ___ suited the client.", a:["which"], why:"Quantifier + of which (things)."},
 {_t:"gram", s:"That is the reason ___ the board rejected the proposal.", o:["for which", "for that", "which", "for what"], a:0, why:"Preposition + which."},
 {_t:"oc", s:"They introduced a system ___ staff can swap shifts online.", a:["whereby"], why:"Whereby = by means of which."}]},
{id:"future-forms", t:"Other ways to talk about the future", es:"be about to (a punto de), be on the verge/point of + -ing, be due to (previsto, con horario), be bound to (seguro que), be likely/unlikely to, be to (planes oficiales). En pasado: was about to… when…", trap:"«It's probable that he comes» suena a traducción. Natural: He is likely to come / He is bound to come.", ex:["The new line is due to open in June.", "Prices are bound to rise next year.", "I was about to leave when the phone rang."], items:[
 {_t:"kwt", s1:"The train is scheduled to arrive at 9.40.", key:"DUE", pre:"The train", post:"at 9.40.", a:["is due to arrive"], why:"Be due to + infinitive."},
 {_t:"kwt", s1:"I'm certain that he'll complain about the changes.", key:"BOUND", pre:"He", post:"about the changes.", a:["is bound to complain"], why:"Be bound to = certain to."},
 {_t:"kwt", s1:"It probably won't rain during the race.", key:"UNLIKELY", pre:"It", post:"during the race.", a:["is unlikely to rain"], why:"Be unlikely to + infinitive."},
 {_t:"oc", s:"The company was on the ___ of collapse when the investors stepped in.", a:["verge", "brink", "point"], why:"On the verge/brink/point of."}]}
];

/* ===== Writing: guías por tipo de texto ===== */
C1.GENRES = {
essay:{n:"Essay", match:/essay/i, reg:"Formal e impersonal. Sin contracciones. Parte 1, obligatorio.", plan:["Introducción: presenta el tema y anuncia las dos ideas que vas a tratar (no copies el enunciado).", "Párrafo 1: primera idea + razón + ejemplo.", "Párrafo 2: segunda idea + razón + ejemplo.", "Conclusión: di cuál de las dos es más importante y por qué. Es obligatorio elegir."], phrases:[
 ["It is often argued that…", "abrir el tema"], ["This essay will consider two of these factors.", "anunciar la estructura"], ["One of the most compelling arguments in favour of… is that…", "primer argumento"], ["A further point worth considering is…", "añadir"], ["While it is true that…, it should not be forgotten that…", "conceder y rebatir"], ["This is largely due to the fact that…", "dar la causa"], ["On balance, I am convinced that…", "concluir"], ["Of the two approaches, … is likely to have the greater impact.", "elegir en la conclusión"]]},
letter:{n:"Letter / Email", match:/letter|email/i, reg:"Depende del lector: formal para una empresa o un periódico, neutro o informal para un amigo. Mantén el mismo registro de principio a fin.", plan:["Saludo y motivo de la carta en la primera línea.", "Un párrafo por cada punto que pide la tarea (suelen ser tres).", "Cierre: qué esperas que pase ahora.", "Despedida acorde: Yours sincerely (sabes el nombre), Yours faithfully (Dear Sir or Madam)."], phrases:[
 ["I am writing with regard to…", "motivo, formal"], ["I am writing to express my concern about…", "queja formal"], ["I would be grateful if you could…", "petición formal"], ["I feel I must point out that…", "señalar un problema"], ["I would welcome the opportunity to…", "ofrecerse"], ["I look forward to hearing from you.", "cierre formal"], ["It was great to hear from you.", "abrir, informal"], ["Do let me know how you get on.", "cierre informal"]]},
proposal:{n:"Proposal", match:/proposal/i, reg:"Formal y persuasivo, orientado al futuro. Con título y encabezados. Dirigido a quien decide.", plan:["Título + Introduction: propósito de la propuesta.", "Current situation: qué problema hay.", "Suggestions / Proposed action: qué propones, con encabezado propio.", "Recommendations / Conclusion: beneficios y por qué debería aprobarse."], phrases:[
 ["The aim of this proposal is to…", "propósito"], ["At present, …", "situación actual"], ["I would strongly recommend that the company invest in…", "recomendar (subjuntivo)"], ["This would enable staff to…", "beneficio"], ["Were this measure to be adopted, …", "condición formal"], ["A further benefit would be…", "añadir beneficio"], ["If these recommendations are implemented, …", "cerrar"], ["I trust you will give this proposal your full consideration.", "última frase"]]},
report:{n:"Report", match:/report/i, reg:"Formal y objetivo, sobre algo que ya ha pasado o existe. Con título y encabezados. Termina con recomendaciones.", plan:["Título + Introduction: de qué trata y en qué se basa.", "Dos o tres secciones con encabezado: hallazgos.", "Conclusion: valoración global.", "Recommendations: qué habría que hacer."], phrases:[
 ["The purpose of this report is to evaluate…", "propósito"], ["This report is based on feedback from…", "fuente de datos"], ["The vast majority of participants felt that…", "hallazgo"], ["A number of concerns were raised regarding…", "problema"], ["It was generally agreed that…", "consenso"], ["In light of the above, …", "pasar a concluir"], ["It is recommended that… be…", "recomendación (subjuntivo)"], ["Overall, the programme can be considered a success.", "valoración global"]]},
review:{n:"Review", match:/review/i, reg:"Neutro o semiformal, personal y vivo. Describe poco, opina mucho. Engancha al lector y acaba recomendando (o no).", plan:["Título con gancho + apertura que despierte interés.", "Qué es: descripción breve, sin contarlo todo.", "Lo mejor y lo peor, con ejemplos concretos.", "Recomendación clara: a quién se lo recomiendas y por qué."], phrases:[
 ["If you only see one … this year, make it this one.", "apertura con gancho"], ["What sets it apart is…", "destacar"], ["It more than lives up to the hype.", "elogio"], ["Where it falls short is…", "crítica"], ["I was particularly struck by…", "impresión personal"], ["It is not without its flaws, however.", "matizar"], ["I would thoroughly recommend it to anyone who…", "recomendar"], ["All in all, it is well worth the money.", "cierre"]]}
};
C1.CRITERIA = [
 ["content", "Content", "¿He respondido a todo lo que pide la tarea? ¿El lector quedaría plenamente informado?"],
 ["communicative", "Communicative Achievement", "¿El registro y el formato son los del tipo de texto? ¿Mantiene la atención del lector?"],
 ["organisation", "Organisation", "¿Hay párrafos claros y conectores variados? ¿Se sigue el hilo sin esfuerzo?"],
 ["language", "Language", "¿Hay variedad de vocabulario y estructuras complejas, con pocos errores?"]
];

/* Microejercicios de escritura (10 minutos). Se comparan con un modelo; no hay una única respuesta. */
C1.MICRO = {
para:{n:"Paraphrase", d:"Di lo mismo con otras palabras y otra estructura.", items:[
 ["Many people think that working from home makes employees less productive.", "It is widely believed that remote working has a negative effect on productivity."],
 ["The government should spend more money on public transport.", "Greater public investment in transport ought to be a priority for the government."],
 ["Young people today find it very hard to buy a house.", "Getting on the property ladder has become extremely difficult for the younger generation."],
 ["Technology has changed the way we communicate.", "The way in which we communicate has been transformed by technology."],
 ["If companies don't train their staff, they will lose them.", "Firms that fail to invest in training run the risk of losing their employees."]]},
reg:{n:"Raise the register", d:"Pasa la frase a un registro formal de informe o carta.", items:[
 ["We need to fix this problem as soon as we can.", "This issue needs to be resolved as a matter of urgency."],
 ["Lots of people complained about the food.", "A considerable number of complaints were received regarding the catering."],
 ["I want to know why my order hasn't arrived.", "I would be grateful if you could explain why my order has not yet been delivered."],
 ["The course was OK but it was too short.", "Although the course was satisfactory overall, its duration was felt to be insufficient."],
 ["You should think about getting new computers.", "I would recommend that consideration be given to replacing the existing computers."]]},
join:{n:"Join with a linker", d:"Une las dos frases en una sola con un conector de C1.", items:[
 ["The project was over budget. It was finished on time.", "Despite being over budget, the project was finished on time."],
 ["He had no experience. He was offered the job.", "Although he had no experience, he was offered the job."],
 ["The first hotel is cheap. The second one is luxurious.", "The first hotel is cheap, whereas the second is luxurious."],
 ["Sales fell. The company closed two factories.", "Owing to the fall in sales, the company closed two factories."],
 ["She checked the data. Then she wrote the report.", "Having checked the data, she wrote the report."]]},
intro:{n:"Write only the introduction", d:"Escribe solo la introducción (40–50 palabras): presenta el tema sin copiar el enunciado y anuncia qué vas a tratar.", items:[
 ["Essay: Which is more effective in reducing traffic in city centres: better public transport or higher parking charges?", "Congestion in city centres has become a pressing concern for local authorities, and a range of measures has been put forward to tackle it. This essay will examine two of them, improved public transport and increased parking charges, and consider which is likely to prove more effective."],
 ["Essay: How can employers best help staff maintain a healthy work-life balance: flexible hours or a limit on overtime?", "In recent years the boundary between work and private life has become increasingly blurred, with consequences for employees' well-being. This essay will discuss two ways in which employers could address the problem, namely flexible hours and a cap on overtime, and assess their relative merits."],
 ["Report: You attended a two-day training course paid for by your company. Report on its usefulness.", "The purpose of this report is to evaluate the two-day project management course I attended last month at the company's expense. It outlines the content of the course, assesses its relevance to my role and makes recommendations regarding future participation."],
 ["Proposal: Suggest how your town could attract more visitors.", "The aim of this proposal is to put forward ways in which the town could increase visitor numbers. It describes the current situation, suggests two initiatives and explains the benefits they would bring to local businesses."],
 ["Review: Review a documentary series you have watched recently.", "If you have ever wondered what really goes on behind the garage doors of a Formula 1 team, this series is for you. Over ten gripping episodes it takes viewers closer to the sport than any broadcast ever has."]]}
};

/* ===== Speaking ===== */
C1.TALK = [
 "Describe a project you were involved in that did not go to plan. What happened and what did you learn?",
 "Some people say that major sporting events are a waste of public money. What is your view?",
 "Talk about a piece of engineering you admire and explain why it impresses you.",
 "Is it better to specialise early in your career or to try many different roles?",
 "How has technology changed the way people work in your field?",
 "Describe a decision you found difficult to make and how you reached it.",
 "Should companies let employees work wherever they want?",
 "What makes a good team leader? Give examples from your own experience.",
 "Talk about a place you would like to live in for a year and explain your choice.",
 "How important is it to speak several languages nowadays?"
];
C1.P2 = [
 {a:"an engineer inspecting a bridge from a rope", b:"a team checking plans in a control room", q:"Compare the two situations and say what skills the people need and how they might be feeling."},
 {a:"a pit crew changing tyres during a race", b:"a surgeon and nurses in an operating theatre", q:"Compare them and say why teamwork is important in each case and what could go wrong."},
 {a:"someone studying alone late at night", b:"a group of students revising together in a café", q:"Compare them and say what the advantages of each way of studying might be."},
 {a:"a crowded commuter train", b:"a person cycling to work along a river", q:"Compare them and say why people might choose to travel this way and how it affects their day."},
 {a:"a manager giving a presentation to a large audience", b:"two colleagues talking over coffee", q:"Compare them and say how difficult it might be to communicate well in each situation."},
 {a:"a family hiking in the mountains", b:"friends watching a football match in a stadium", q:"Compare them and say what the people might be enjoying and which experience they will remember longer."},
 {a:"a worker operating a machine in a factory", b:"a person working on a laptop at home", q:"Compare them and say how satisfying these ways of working might be."},
 {a:"an old stone building being restored", b:"a glass skyscraper under construction", q:"Compare them and say what challenges the workers face and why the work is important."}
];
C1.TALKPH = [
 ["As far as I'm concerned, …", "dar opinión"], ["I'd go along with that up to a point, but…", "acuerdo parcial"], ["I see what you mean, although…", "discrepar con tacto"], ["That's a fair point. Having said that, …", "conceder y matizar"], ["What I find striking is…", "destacar"], ["It's hard to say, but if I had to choose, …", "ganar tiempo y decidir"], ["Both pictures show…, whereas the first one…", "comparar (Part 2)"], ["They might well be feeling…", "especular"], ["Shall we move on to…?", "gestionar la conversación"], ["So, are we agreed that…?", "llegar a un acuerdo"], ["What's your take on this?", "invitar al compañero"], ["To a certain extent, yes, though…", "matizar"]
];
