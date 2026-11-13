/* ==========================================================================
   MIND THE GAP · CONTENIDO AMPLIADO
   Se carga después de data.js y añade contenido a BANK.
   Aquí van las mejoras de cada iteración (más fácil de revisar que data.js).
   ========================================================================== */

/* ---------- Work English: project management & industrial maintenance ---------- */
BANK.work = [
  {t:"to touch base", m:"to make brief contact to update each other", d:["to start a project from zero","to visit a construction site","to reduce the budget"], ex:"Let's touch base on Thursday once the inspection report is in."},
  {t:"to chase (someone) up", m:"to remind someone to do what they promised", d:["to dismiss someone","to promote someone quickly","to argue with a supplier"], ex:"Could you chase up the supplier about the replacement valves?"},
  {t:"a bottleneck", m:"a point where work slows everything down", d:["a broken pipe","a type of contract","an extra payment"], ex:"Approvals from head office have become the real bottleneck."},
  {t:"lead time", m:"time between ordering something and receiving it", d:["the time a meeting lasts","the hours a manager works","the deadline for a tender"], ex:"The lead time on that compressor is twelve weeks, so order it now."},
  {t:"scope creep", m:"gradual, uncontrolled growth of a project's requirements", d:["a delay caused by weather","a reduction in staff","a safety incident"], ex:"Every 'small extra' from the client is scope creep unless we price it."},
  {t:"a change order", m:"a formal, priced change to the agreed work", d:["a new employee contract","an urgent purchase","a complaint form"], ex:"We'll need a change order before we install the extra detectors."},
  {t:"to sign off (on) something", m:"to give formal approval", d:["to cancel something","to leave a job","to delay a payment"], ex:"The client has signed off on the maintenance plan for next year."},
  {t:"planned shutdown", m:"a scheduled stop of a plant for maintenance", d:["an unexpected power cut","a strike","a closing-down sale"], ex:"All compressor overhauls are scheduled for the August planned shutdown."},
  {t:"downtime", m:"time when equipment is not working", d:["a quiet period at the weekend","a lunch break","a fall in share prices"], ex:"Our goal is to cut unplanned downtime by a third."},
  {t:"preventive maintenance", m:"routine work done before anything fails", d:["repairs after a breakdown","cleaning the offices","buying new machines"], ex:"Preventive maintenance is cheaper than a weekend call-out."},
  {t:"a call-out", m:"a visit by a technician to fix an urgent fault", d:["a public announcement","a job advert","a formal warning"], ex:"We had three call-outs last night for the same fire panel."},
  {t:"a snag list", m:"a list of small defects still to be fixed", d:["a list of suppliers","a shopping list for tools","a list of overdue invoices"], ex:"We can't hand over the building until the snag list is closed out."},
  {t:"to close out", m:"to finish completely, including the paperwork", d:["to lock a building","to refuse an offer","to sack a contractor"], ex:"Let's close out the remaining actions before the audit."},
  {t:"a site walk", m:"an inspection tour of a site with others", d:["a strike outside the office","a fitness challenge","a route for deliveries"], ex:"I've arranged a site walk with the client at nine."},
  {t:"permit to work", m:"written authorisation for hazardous work", d:["a residence permit","a parking licence","a building licence"], ex:"Nobody touches the switchgear without a permit to work."},
  {t:"lockout/tagout (LOTO)", m:"isolating energy sources before maintenance", d:["locking the office at night","tagging photos on social media","a lunch rota"], ex:"Apply lockout/tagout before opening the panel."},
  {t:"a near miss", m:"an incident that could have caused harm but didn't", d:["a missed deadline","a lost tender","a small accident"], ex:"Please report every near miss — that's how we prevent the real ones."},
  {t:"to flag (something) up", m:"to draw attention to a possible problem", d:["to celebrate","to hide something","to approve a budget"], ex:"I just wanted to flag up a possible clash with the electrical team."},
  {t:"to be on track", m:"to progress as planned", d:["to be travelling by train","to be late","to be on holiday"], ex:"Despite the delay, we're still on track for handover in May."},
  {t:"to fall behind (schedule)", m:"to make less progress than planned", d:["to win a contract","to stay in the office","to lose money"], ex:"We fell behind schedule when the cabling arrived damaged."},
  {t:"to get the go-ahead", m:"to receive permission to start", d:["to be dismissed","to receive a fine","to lose a client"], ex:"Once we get the go-ahead, we can mobilise within a week."},
  {t:"a handover", m:"formally passing work or a site to someone else", d:["a tip for a waiter","a bribe","a refund"], ex:"The handover pack includes all as-built drawings and test certificates."},
  {t:"as-built drawings", m:"drawings showing how something was actually installed", d:["sketches for a tender","architectural renderings","drafts not yet approved"], ex:"Please update the as-built drawings before commissioning."},
  {t:"commissioning", m:"testing a new installation to prove it works", d:["paying a sales commission","hiring staff","ordering materials"], ex:"Commissioning of the sprinkler system is booked for next week."},
  {t:"to be up to code", m:"to comply with current regulations", d:["to be programmed correctly","to be expensive","to be well designed"], ex:"Half the emergency lighting isn't up to code."},
  {t:"a ballpark figure", m:"a rough estimate", d:["the final price","a sports budget","a bonus"], ex:"Can you give me a ballpark figure for replacing the chillers?"},
  {t:"to go over budget", m:"to spend more than planned", d:["to save money","to get a new budget","to cancel a project"], ex:"We went over budget on labour because of overtime."},
  {t:"a stakeholder", m:"someone affected by or interested in a project", d:["a shareholder only","a site worker","a competitor"], ex:"Keep the facilities team in the loop — they're a key stakeholder."},
  {t:"to keep (someone) in the loop", m:"to keep someone informed", d:["to exclude someone","to give someone extra work","to train someone"], ex:"Please keep me in the loop on the insurance inspection."},
  {t:"to escalate (an issue)", m:"to pass a problem to a higher level", d:["to solve a problem alone","to ignore an issue","to climb stairs"], ex:"If the supplier doesn't respond by Friday, I'll escalate it."},
  {t:"a root cause", m:"the underlying reason why something happened", d:["the first symptom","the person responsible","the main cost"], ex:"Replacing the fuse is a quick fix; we still need the root cause."},
  {t:"a quick fix", m:"a fast but temporary solution", d:["a permanent repair","a broken tool","a cheap supplier"], ex:"Taping the duct is a quick fix, not a solution."},
  {t:"to troubleshoot", m:"to find and fix the cause of a fault", d:["to cause trouble","to fire a gun","to plan a project"], ex:"The technician is troubleshooting the compressor's pressure drop."},
  {t:"a service level agreement (SLA)", m:"a contract defining response times and standards", d:["a salary agreement","a sales target","a lease"], ex:"Under the SLA, we must respond to critical faults within four hours."},
  {t:"liquidated damages", m:"a pre-agreed penalty for late completion", d:["damaged stock sold cheaply","insurance payouts","water damage"], ex:"Every week of delay triggers liquidated damages under the contract."},
  {t:"a tender", m:"a formal offer to do work at a stated price", d:["a soft piece of meat","a delivery van","a bank loan"], ex:"We submitted our tender for the hospital maintenance contract."},
  {t:"to subcontract", m:"to pay another company to do part of the work", d:["to break a contract","to sign a contract twice","to lower a contract value"], ex:"We subcontract the fire suppression testing to a specialist."},
  {t:"to have a lot on one's plate", m:"to be very busy", d:["to eat too much","to have a big office","to be rich"], ex:"I know you've got a lot on your plate, but this one's urgent."},
  {t:"to circle back", m:"to return to a topic later", d:["to drive round a roundabout","to repeat a mistake","to leave early"], ex:"Let's circle back to the budget once we have the quotes."},
  {t:"a heads-up", m:"advance warning", d:["a promotion","a type of helmet","a quick meeting"], ex:"Just a heads-up: the fire alarm test is at ten tomorrow."}
];

/* ---------- More idioms & phrasal verbs (meetings, opinion, British usage) ---------- */
BANK.idioms = BANK.idioms.concat([
  {t:"to play it by ear", m:"to decide as things develop", d:["to learn music","to listen carefully","to follow strict rules"], ex:"We don't know when the parts will arrive, so let's play it by ear."},
  {t:"to cut corners", m:"to do something badly to save time or money", d:["to take a shorter route","to reduce staff","to design rounded edges"], ex:"Never cut corners on fire safety."},
  {t:"the elephant in the room", m:"an obvious problem nobody mentions", d:["a very large client","a noisy colleague","an expensive mistake"], ex:"The elephant in the room is that we're three weeks late."},
  {t:"to bite the bullet", m:"to accept something unpleasant and do it", d:["to make a hasty decision","to get angry","to be lucky"], ex:"We'll have to bite the bullet and replace the whole system."},
  {t:"to get the ball rolling", m:"to start an activity", d:["to play football","to finish quickly","to cause trouble"], ex:"Shall I get the ball rolling with a quick update?"},
  {t:"to be on the same page", m:"to agree or understand the same thing", d:["to read the same book","to work in the same office","to be equally busy"], ex:"Before we sign, let's make sure we're all on the same page."},
  {t:"a can of worms", m:"a situation that creates many new problems", d:["a fishing trip","a cheap meal","a messy desk"], ex:"Reopening the contract would open a can of worms."},
  {t:"to throw someone under the bus", m:"to blame someone else to protect yourself", d:["to help someone in trouble","to fire someone politely","to give someone a lift"], ex:"He threw the subcontractor under the bus in front of the client."},
  {t:"in the pipeline", m:"being planned or developed", d:["blocked","finished","in the water supply"], ex:"We've got two new contracts in the pipeline."},
  {t:"to go the extra mile", m:"to make more effort than expected", d:["to travel further","to work less","to take a long holiday"], ex:"The night shift really went the extra mile to restore power."},
  {t:"to put out fires", m:"to deal with urgent problems constantly", d:["to work as a firefighter","to save energy","to calm someone down"], ex:"I spent the whole week putting out fires instead of planning."},
  {t:"a steep learning curve", m:"a lot to learn very quickly", d:["a difficult hill","a falling price","a slow career"], ex:"Starting as a project manager is a steep learning curve."},
  {t:"to hit the ground running", m:"to start something quickly and effectively", d:["to fall over","to start slowly","to run a marathon"], ex:"With your plant experience, you'll hit the ground running."},
  {t:"to keep someone posted", m:"to keep someone updated", d:["to send someone letters","to give someone a job","to keep someone waiting"], ex:"I'll keep you posted on the inspection."},
  {t:"to be swamped", m:"to have too much work", d:["to be flooded with water","to be relaxed","to be fired"], ex:"Sorry for the late reply — I've been swamped this week."},
  {t:"to take something on board", m:"to accept and consider an idea or suggestion", d:["to load a ship","to reject an idea","to hire someone"], ex:"Thanks for the feedback — I'll take it on board."},
  {t:"to sit on the fence", m:"to avoid choosing a side", d:["to rest outside","to watch a match","to be undecided about a job"], ex:"You can't sit on the fence forever; we need a recommendation."},
  {t:"spot on", m:"exactly right", d:["slightly wrong","dirty","late"], ex:"Your estimate was spot on — eleven days exactly."},
  {t:"to be gutted", m:"to be extremely disappointed", d:["to be very hungry","to be injured","to be relieved"], ex:"We were gutted when we lost the tender by a few euros."},
  {t:"a cock-up", m:"a stupid mistake (informal British)", d:["a celebration","a promotion","a small bird"], ex:"There was a cock-up with the delivery address."}
]);

/* ---------- Spelling: work vocabulary ---------- */
BANK.spell = BANK.spell.concat([
  {w:"maintenance", s:"The maintenance contract is renewed every year.", tip:"main-TEN-ance: not 'maintainance'."},
  {w:"commissioning", s:"Commissioning starts once the cables are tested.", tip:"Double m, double s."},
  {w:"compressor", s:"The compressor tripped twice last night.", tip:"Double s, ends in -or."},
  {w:"sprinkler", s:"The sprinkler heads must be checked annually.", tip:"sprink-LER."},
  {w:"schedule", s:"We're two days behind schedule.", tip:"sch-, like 'school' (British: SHED-yool)."},
  {w:"liaise", s:"I'll liaise with the client's facilities team.", tip:"Two i's: li-AISE."},
  {w:"inspector", s:"The fire inspector arrives at nine.", tip:"-or, not -er."},
  {w:"guarantee", s:"The pump is still under guarantee.", tip:"gu-A-ran-tee."},
  {w:"occurrence", s:"Power cuts are a rare occurrence here.", tip:"Double c, double r, -ence."},
  {w:"procurement", s:"Procurement approved the purchase order.", tip:"pro-CURE-ment."},
  {w:"subcontractor", s:"The subcontractor is responsible for testing.", tip:"sub + contract + or."},
  {w:"acknowledgement", s:"Please send an acknowledgement of receipt.", tip:"British: keep the 'e' after 'g'."},
  {w:"licence", s:"Do you have a valid licence for this work?", tip:"Noun 'licence', verb 'license' (British)."},
  {w:"programme", s:"The training programme lasts six weeks.", tip:"British: programme (but computer 'program')."},
  {w:"centre", s:"The data centre needs a new cooling system.", tip:"British: -re."},
  {w:"organisation", s:"Our organisation employs 3,000 technicians.", tip:"British spelling uses -s- (also -z- accepted)."},
  {w:"budget", s:"We're still within budget.", tip:"bud-GET: d before g."},
  {w:"feasible", s:"A two-week deadline isn't feasible.", tip:"-ible, not -able."},
  {w:"privilege", s:"It's a privilege to lead this team.", tip:"No 'd': privi-LEGE."},
  {w:"questionnaire", s:"Please fill in the safety questionnaire.", tip:"Double n, ends -aire."}
]);

/* ---------- Reading: more articles on the learner's interests ---------- */
BANK.reading = BANK.reading.concat([
 {id:"r-predictive", topic:"Engineering", title:"Listening to Machines Before They Break", mins:4,
  body:`For most of the twentieth century, industrial maintenance followed a simple rule: fix it when it breaks, or replace it on a fixed date whether it needs it or not. Both approaches are expensive. The first leads to unplanned downtime, emergency call-outs and, occasionally, dangerous failures. The second means throwing away components that might have run perfectly well for years.

Predictive maintenance promises a third way. Instead of guessing, engineers monitor the condition of equipment continuously. Vibration sensors pick up the tiny changes that occur when a bearing begins to wear. Thermal cameras reveal electrical connections that are running hotter than they should. In compressed-air systems, ultrasonic detectors can locate leaks that are inaudible to the human ear — leaks which, across a large factory, can quietly waste a significant share of the energy bill.

The data is only useful, however, if someone acts on it. Many organisations have invested heavily in sensors and dashboards, only to discover that nobody has the time, or the authority, to respond to the alerts. A warning that a pump is likely to fail within three weeks is worthless if ordering a replacement takes six. In other words, the real challenge is rarely technical; it is organisational.

Successful teams therefore start small. Rather than wiring up an entire plant, they choose a handful of critical assets — the ones whose failure would halt production or compromise safety — and build a reliable process around them: who reviews the data, what thresholds trigger action, and how quickly spare parts can be obtained. Only once that routine is working do they scale up.

There is a human dimension, too. Experienced technicians often resent being told what to do by an algorithm, particularly when their instincts have served them well for decades. The most effective managers involve them from the outset, treating the sensors as a tool that sharpens their judgement rather than one that replaces it. After all, the best early-warning system on many sites is still a veteran who notices that a motor "doesn't sound right".`,
  gloss:{"downtime":"tiempo de inactividad","bearing":"rodamiento","inaudible":"inaudible","dashboards":"paneles de control","thresholds":"umbrales","halt":"detener","resent":"tomarse a mal, molestar","from the outset":"desde el principio","sharpens":"afina, mejora","veteran":"veterano"},
  q:[
   {q:"What is the main problem with replacing parts on a fixed date?", o:["It causes dangerous failures","Parts that still work are thrown away","It requires too many sensors","It is illegal in many countries"], a:1},
   {q:"According to the writer, the biggest obstacle to predictive maintenance is…", o:["the cost of sensors","organisational, not technical","the lack of data","the accuracy of algorithms"], a:1},
   {q:"How do successful teams usually begin?", o:["By monitoring the whole plant at once","By focusing on a few critical assets","By replacing experienced technicians","By buying more spare parts"], a:1},
   {q:"What does the final paragraph suggest?", o:["Algorithms are better than people","Technicians should be ignored","Human experience remains valuable alongside technology","Sensors are too noisy to be useful"], a:2}
  ]},
 {id:"r-f1-pitwall", topic:"Sport", title:"The Engineers Who Win Races From the Pit Wall", mins:4,
  body:`When a Formula One driver crosses the line first, the cameras focus on the helmet, the champagne and the podium. Yet many races are decided not on the track but on the pit wall, by engineers staring at screens and making split-second decisions with incomplete information.

Take the humble pit stop. A modern team can change four tyres in little more than two seconds, but the real question is not how fast to stop, but when. Stop too early and the driver may run out of grip before the end of the race; stop too late and a rival who pitted earlier may emerge ahead on fresher tyres — a manoeuvre known as the undercut. Strategists run thousands of simulations before the weekend, yet a single safety car can render all of them obsolete in an instant.

What makes the job so demanding is that every decision is a trade-off between competing risks. Data on tyre wear, fuel load, weather radar and rivals' lap times flows in continuously, and the strategist must weigh it against the driver's own feedback, which is often blunt and occasionally contradictory. A driver shouting that the tyres are "gone" may be right, or may simply be frustrated after a slow lap.

Crucially, the best teams accept that they will sometimes get it wrong. After every race, decisions are reviewed without assigning blame: what did we know at the time, what did we assume, and what would we do differently? This culture of honest debriefing is one reason why lessons from Formula One are increasingly borrowed by hospitals, airlines and engineering firms.

For anyone managing complex projects, the parallels are striking. Plans are essential, but no plan survives first contact with reality. What matters is having good information, clear roles, and the confidence to change course quickly when circumstances demand it.`,
  gloss:{"pit wall":"muro de boxes","split-second":"en una fracción de segundo","grip":"agarre","emerge":"salir, aparecer","undercut":"undercut (adelantar parando antes)","render obsolete":"dejar obsoleto","trade-off":"compromiso, equilibrio entre opciones","blunt":"directo, brusco","debriefing":"análisis posterior","striking":"llamativo"},
  q:[
   {q:"According to the article, the key decision about pit stops is…", o:["how quickly to change tyres","when to stop","which driver stops first","how much fuel to add"], a:1},
   {q:"What is 'the undercut'?", o:["Stopping later to save tyres","Overtaking a rival by pitting earlier on fresher tyres","A shortcut on the track","A penalty for unsafe release"], a:1},
   {q:"Why is the driver's feedback not always reliable?", o:["Drivers cannot see the tyres","The radio often fails","Emotion can colour what they say","Drivers are not allowed to give opinions"], a:2},
   {q:"What lesson does the writer draw for project managers?", o:["Avoid making plans","Always trust the data over people","Be ready to adapt the plan using good information","Copy hospitals and airlines"], a:2}
  ]},
 {id:"r-megaproject", topic:"Project management", title:"What a Railway Under London Teaches About Megaprojects", mins:5,
  body:`When London's Elizabeth line finally opened in 2022, passengers were struck by its spacious stations and quiet, air-conditioned trains. Few of them would have guessed that the project had been one of the most troubled in recent British history: more than three years late and several billion pounds over its original budget.

The tunnelling itself was a triumph. Giant boring machines carved more than forty kilometres of new tunnels beneath one of the most crowded cities on Earth, threading between Tube lines, sewers and foundations, sometimes with only a metre or so to spare. The problems came later, and they were far less visible. Integrating the signalling software with three different train-control systems proved fiendishly complex, and testing took far longer than anyone had planned.

Investigations afterwards pointed to a familiar pattern. Leadership had been reluctant to report bad news, partly because a fixed opening date had become a matter of public prestige. Progress was measured by how much had been built rather than by how much had been tested and handed over. As a result, the schedule looked healthy until very late, when it suddenly collapsed.

Several lessons have since been taken on board by the industry. Systems integration must be planned from the start rather than treated as the final step. Contingency should be realistic, not decorative. And perhaps most importantly, organisations need a culture in which raising a problem early is rewarded, not punished.

None of this diminishes what was achieved. The line now carries more than 250 million journeys a year and has reshaped how people move across the capital. But for project managers, its story is a reminder that the hardest part of a megaproject is often not the engineering. It is telling the truth about where you really are.`,
  gloss:{"troubled":"problemático","boring machines":"tuneladoras","threading":"abriéndose paso","to spare":"de margen","fiendishly":"endiabladamente","reluctant":"reacio","prestige":"prestigio","handed over":"entregado","contingency":"contingencia, margen","decorative":"decorativo, de adorno"},
  q:[
   {q:"Which part of the project does the writer describe as a success?", o:["The signalling","The tunnelling","The testing","The budget"], a:1},
   {q:"Why did the schedule look healthy until late on?", o:["Progress was measured by construction rather than testing and handover","The software was finished early","Passengers were happy","The budget was increased"], a:0},
   {q:"What does 'contingency should be realistic, not decorative' mean?", o:["Margins should be large enough to actually absorb problems","Projects should look attractive","Budgets should be secret","Designs should be simple"], a:0},
   {q:"What is the writer's main point?", o:["The Elizabeth line was a failure","Megaprojects should be avoided","Honest reporting is as important as engineering","Tunnelling is the hardest part of any project"], a:2}
  ]}
]);

/* ---------- Listening: more scripts on work situations ---------- */
BANK.listening = BANK.listening.concat([
 {id:"l-sitewalk", topic:"Project management", title:"Site walk: the fire panel faults", lines:[
  ["A","Morning. Thanks for coming down at such short notice. I'll be honest, we're not happy with how many false alarms we've had this month."],
  ["B","Completely understood. We've had a look at the logs, and most of them trace back to two detectors in the loading bay."],
  ["A","The loading bay? Why there?"],
  ["B","It's the diesel fumes from the forklifts. Those are optical smoke detectors, and they're picking up the exhaust. The fix is to swap them for heat detectors in that zone."],
  ["A","Right. And is that covered under the maintenance contract, or is it an extra?"],
  ["B","Strictly speaking, it's a design change, so it would need a small change order. But I'll get you a quote by Wednesday, and we can do the swap during the planned shutdown so there's no disruption."],
  ["A","That works. Just make sure the insurers are kept in the loop — they'll want the paperwork."]],
  q:[
   {q:"What is the client unhappy about?", o:["The price of the contract","Repeated false alarms","A late delivery","A safety accident"], a:1},
   {q:"What is causing the problem?", o:["Old wiring","Diesel fumes from forklifts","Dust from building work","A software bug"], a:1},
   {q:"What solution does the contractor propose?", o:["Moving the loading bay","Replacing the detectors with heat detectors","Switching the alarm off","Buying electric forklifts"], a:1},
   {q:"When will the work be done?", o:["Today","On Wednesday","During the planned shutdown","Next year"], a:2}],
  dict:["Most of them trace back to two detectors in the loading bay.","Strictly speaking, it's a design change, so it would need a small change order."]},
 {id:"l-supplier", topic:"Business & finance", title:"Phone call: the compressor is late", lines:[
  ["A","Hi, it's Alex from the maintenance team. I'm calling about the compressor we ordered — it was due last Friday."],
  ["B","Ah, yes. I'm really sorry about that. Our manufacturer has had a problem with one of the motor components, and the whole batch has been held back."],
  ["A","I see. The thing is, we've got a backup unit running at the moment, and if that one goes, the whole production line stops. Can you give me a realistic date?"],
  ["B","I can't promise anything before the twentieth, I'm afraid. What I can do is send you a rental unit in the meantime, free of charge."],
  ["A","That would help a lot. Could you put that in writing, including the delivery date for the rental?"],
  ["B","Of course. I'll email you this afternoon and copy in your purchasing manager."],
  ["A","Great, thanks. I'll hold you to that."]],
  q:[
   {q:"Why is the compressor late?", o:["It was sent to the wrong address","There is a problem with a motor component","The order was never placed","The invoice wasn't paid"], a:1},
   {q:"Why is the delay a serious risk?", o:["The backup unit is running and could fail","The client wants a refund","The warranty has expired","The factory is closing"], a:0},
   {q:"What does the supplier offer?", o:["A discount","A free rental unit","A different model","A refund"], a:1},
   {q:"What does 'I'll hold you to that' mean?", o:["I'll wait on the line","I expect you to keep your promise","I'll call you back","I don't believe you"], a:1}],
  dict:["The whole batch has been held back.","Could you put that in writing, including the delivery date?"]},
 {id:"l-pitwall", topic:"Sport", title:"Team radio: to pit or not to pit", lines:[
  ["A","Box this lap, box this lap. We're going for the undercut on car sixteen."],
  ["B","Are you sure? The tyres still feel decent. I could do another three or four laps."],
  ["A","Understood, but the gap is two point one seconds and we think the new tyres are worth at least a second a lap. If we wait, we lose the position."],
  ["B","Copy. What about the rain? It's spitting in sector two."],
  ["A","Radar shows it should clear in ten minutes. We'll stay on slicks. Push hard on the out-lap, that's where we win it."],
  ["B","Okay, boxing."]],
  q:[
   {q:"What does the engineer want the driver to do?", o:["Slow down","Come into the pits this lap","Overtake car sixteen on track","Change to wet tyres"], a:1},
   {q:"How does the driver feel about the tyres?", o:["They're completely worn","They still feel reasonably good","They're too cold","They've got a puncture"], a:1},
   {q:"What does the radar suggest?", o:["Heavy rain is coming","The rain will stop soon","The race will be stopped","It's dry everywhere"], a:1},
   {q:"Why is the out-lap important?", o:["It's where the position can be gained","It's the last lap","Overtaking is banned","The car has more fuel"], a:0}],
  dict:["We're going for the undercut on car sixteen.","Push hard on the out-lap, that's where we win it."]}
]);

/* ---------- Writing: work tasks ---------- */
BANK.writing = BANK.writing.concat([
 {id:"w-email-shutdown", type:"Formal email", level:"C1", words:"180–220", prompt:"You are the project manager for a maintenance contractor. Write an email to a client's facilities manager explaining that the annual electrical inspection requires a four-hour power shutdown next month. Explain why it is necessary, propose two possible dates, describe how disruption will be minimised and ask for confirmation."},
 {id:"w-report-incident", type:"Report", level:"C1", words:"220–260", prompt:"A near miss occurred on one of your sites when a technician started work on a compressed-air line that had not been isolated. Write a report for your operations director describing what happened, the root causes, the immediate actions taken and your recommendations to prevent it from happening again."},
 {id:"w-proposal-predictive", type:"Proposal", level:"C2", words:"280–320", prompt:"Your company is considering introducing predictive maintenance for its biggest client. Write a proposal for senior management outlining the potential benefits, the main risks and costs, and a phased plan for a pilot project."}
]);

/* ---------- Speaking ---------- */
BANK.speak = {
  // Shadowing: listen, repeat, compare. Natural meeting & site English.
  shadow:[
    {s:"Could you bear with me for a moment while I pull up the figures?", f:"bear with me · pull up"},
    {s:"I'd like to push back a little on that, if I may.", f:"push back · if I may"},
    {s:"Just to recap, we've agreed to bring the inspection forward to Tuesday.", f:"recap · bring forward"},
    {s:"To be fair, the delay wasn't entirely down to the supplier.", f:"to be fair · down to"},
    {s:"We're looking at roughly three weeks, give or take.", f:"give or take"},
    {s:"I'll get back to you by the end of the day with a firm answer.", f:"get back to you"},
    {s:"That's a fair point, but I'm not entirely convinced it'll work on site.", f:"fair point · not entirely convinced"},
    {s:"Could we park that for now and come back to it at the end?", f:"park that"},
    {s:"Sorry, I didn't quite catch that. Could you say it again?", f:"didn't quite catch that"},
    {s:"The thing is, we can't afford another unplanned shutdown this quarter.", f:"the thing is"},
    {s:"If it's alright with everyone, I'll take the lead on this one.", f:"take the lead"},
    {s:"With hindsight, we should have flagged it much earlier.", f:"with hindsight · flagged"},
    {s:"It's not ideal, but it's the best option we've got.", f:"not ideal"},
    {s:"Let me play devil's advocate for a second.", f:"devil's advocate"},
    {s:"We'll need to have a word with the fire safety officer before we go ahead.", f:"have a word · go ahead"},
    {s:"I'm afraid that's non-negotiable from a safety point of view.", f:"non-negotiable"},
    {s:"Thanks for bearing with us — we're nearly there.", f:"nearly there"},
    {s:"In a nutshell, the compressor is undersized for the new line.", f:"in a nutshell"},
    {s:"It's a bit of a grey area, so let's check the contract.", f:"grey area"},
    {s:"Whereabouts in the building is the main distribution board?", f:"whereabouts"},
    {s:"I reckon we could have it up and running by Thursday.", f:"I reckon · up and running"},
    {s:"Could you walk me through what happened on Friday night?", f:"walk me through"},
    {s:"That rings a bell — wasn't it the same fault last winter?", f:"rings a bell"},
    {s:"I'd rather over-communicate than leave the client in the dark.", f:"in the dark"}
  ],
  // Open speaking: Cambridge-style and work scenarios (answer 60–90 s).
  prompts:[
    {id:"sp-intro", part:"Interview", level:"C1", q:"Tell me about your job. What do you enjoy most about it, and what do you find challenging?"},
    {id:"sp-delay", part:"Work scenario", level:"C1", q:"A client is angry because a repair is two weeks late. Explain the reason for the delay, apologise without blaming anyone, and propose a solution."},
    {id:"sp-standup", part:"Work scenario", level:"C1", q:"Give a two-minute update at a Monday meeting: what your team did last week, what's planned this week, and one risk you want to flag."},
    {id:"sp-remote", part:"Long turn", level:"C1", q:"Some people say engineers and project managers can work perfectly well from home. To what extent do you agree?"},
    {id:"sp-f1", part:"Long turn", level:"C1", q:"What can business learn from elite sport, such as Formula One or football? Give concrete examples."},
    {id:"sp-safety", part:"Work scenario", level:"C1", q:"Explain to a new technician why permits to work and lockout/tagout are essential, and what could happen if they are skipped."},
    {id:"sp-abroad", part:"Discussion", level:"C2", q:"Would you consider working abroad? Discuss the professional and personal advantages and drawbacks."},
    {id:"sp-ai", part:"Discussion", level:"C2", q:"How do you think artificial intelligence will change maintenance and project management over the next ten years?"},
    {id:"sp-money", part:"Discussion", level:"C1", q:"Is it better to save and invest from a young age, or to enjoy your money while you are young? Justify your view."},
    {id:"sp-failure", part:"Interview", level:"C1", q:"Describe a project or task that didn't go to plan. What happened, and what did you learn?"},
    {id:"sp-negotiate", part:"Work scenario", level:"C2", q:"A client asks for extra work 'for free' that is outside the contract. Politely refuse, explain why, and offer an alternative."},
    {id:"sp-interview", part:"Interview", level:"C2", q:"Job interview: why should we hire you as a project manager for our European operations?"}
  ]
};

/* ---------- More real British audio & video (links) ---------- */
BANK.links = BANK.links.concat([
  {t:"BBC Radio 4 — The Bottom Line", d:"Business leaders discuss real management problems. Excellent for meeting English.", u:"https://www.bbc.co.uk/programmes/b006sz6t"},
  {t:"Institution of Mechanical Engineers — podcasts & videos", d:"British engineers talking about real projects.", u:"https://www.imeche.org/news"},
  {t:"F1 TV / Formula 1 on YouTube", d:"Team radio and technical analysis — British commentators at native speed.", u:"https://www.youtube.com/@Formula1"}
]);

/* ---------- Sources & further reading ----------
   Los artículos son textos originales escritos para la app (no copiados).
   Aquí están las fuentes de los datos que citan, para comprobarlos o leer más. */
BANK.sources = {
  "r-bridge":[
    {t:"Newland (2003), 'Pedestrian excitation of bridges — recent results', Univ. of Cambridge (PDF)", u:"https://iiav.org/ijav/content/volumes/8_2003_710551272264886/vol_1/385_firstpage_196081286806609.pdf"},
    {t:"ENR — New explanation for London's wobbling Millennium Bridge", u:"https://enr.com/articles/53233-new-explanation-given-for-londons-wobbling-millennium-bridge-after-two-decades"},
    {t:"Wikipedia — Millennium Bridge, London (overview and references)", u:"https://en.wikipedia.org/wiki/Millennium_Bridge,_London"}],
  "r-planning":[
    {t:"PMI — Planning for the planning fallacy (Kahneman & Tversky 1979; Flyvbjerg)", u:"https://www.pmi.org/learning/library/planning-fallacy-causes-solutions-project-expectations-6374"},
    {t:"Cranfield — Reference class forecasting: promises, problems and a research agenda (PDF)", u:"https://dspace.lib.cranfield.ac.uk/server/api/core/bitstreams/076d9c29-659d-4bfd-9b1b-e0019ea9ad20/content"},
    {t:"Klein, G. (2007) 'Performing a Project Premortem', Harvard Business Review 85(9) — via Wikipedia", u:"https://www.Wikipedia.org/wiki/Premortem"},
    {t:"Hofstadter's Law: D. Hofstadter, Gödel, Escher, Bach (1979) — book"}],
  "r-habits":[
    {t:"Gollwitzer, P. M. (1999) 'Implementation intentions: Strong effects of simple plans', American Psychologist 54(7) (PDF, Univ. of Konstanz)", u:"https://www.socmot.uni-konstanz.de/sites/default/files/99_Gollwitzer_Implementation_Intentions.pdf"}],
  "r-compound":[
    {t:"Quote Investigator — 'The eighth wonder of the world is compound interest' (not Einstein)", u:"https://quoteinvestigator.com/2019/09/09/interest/"},
    {t:"GOV.UK — Individual Savings Accounts (ISAs)", u:"https://www.gov.uk/individual-savings-accounts"},
    {t:"The £33,000 and £200,000 figures: own calculation (£200/month, 6% a year compounded monthly)"}],
  "r-data-football":[
    {t:"Stats Perform (Opta) — Expected Goals (xG) explained", u:"https://www.statsperform.com/resource/expected-goals-xg/"},
    {t:"FBref — xG explained (Opta model)", u:"https://aws.fbref.com/en/expected-goals-model-explained"}],
  "r-predictive":[
    {t:"U.S. Department of Energy data on compressed-air leaks (20–30% of output), summarised by Reliable Media", u:"https://reliamag.com/topics/guides/compressed-air-leak-statistics"},
    {t:"Carbon Trust compressed air report (FMLink)", u:"https://www.fmlink.com/carbon-trust-compressed-air-report-shows-how-businesses-can-save-money-from-thin-air/"},
    {t:"Atlas Copco — Why you need a compressed air leak test", u:"https://www.atlascopco.com/en-ae/compressors/air-compressor-blog/why-you-need-a-compressed-air-leak-test"}],
  "r-f1-pitwall":[
    {t:"Guinness World Records — Fastest Formula One pit stop (McLaren, 1.80 s, 2023)", u:"https://guinnessworldrecords.com/world-records/108666-fastest-formula-one-pit-stop"},
    {t:"Formula1.com — Jolyon Palmer's analysis: the art of undercutting", u:"https://www.formula1.com/en/latest/article/jolyon-palmers-analysis-singapore-and-the-art-of-undercutting.1NgVyVsZnHTDEA9wi0s5lW"},
    {t:"F1Technical — How do teams define race strategies?", u:"https://www.f1technical.net/news/25828"}],
  "r-megaproject":[
    {t:"National Audit Office (2021) — Crossrail: a progress update (summary, PDF)", u:"https://www.nao.org.uk/wp-content/uploads/2021/07/Crossrail-a-progress-update-Summary.pdf"},
    {t:"Office of Rail and Road — Elizabeth line: 257.4 million journeys in 2025/26", u:"https://www.orr.gov.uk/search-news/orr-says-most-journeys-made-great-britains-rail-network-1920"},
    {t:"TfL — The Elizabeth line reaches 500 million passenger journeys", u:"https://tfl-newsroom.prgloo.com/news/the-transformational-elizabeth-line-reaches-500-million-passenger-journeys-making-it-the-single-busiest-railway-service-in-the-uk"}]
};

/* ---------- Phrasal verbs (choose the right one for the gap) ---------- */
BANK.pv = [
  {s:"We had to ___ the meeting until the client confirmed the dates.", o:["put off","put up","put out","put across"], a:0, why:"put off = postpone."},
  {s:"Could you ___ the figures before we send the report?", o:["go over","go off","go by","go about"], a:0, why:"go over = check carefully."},
  {s:"The supplier ___ at the last minute, so we had to find another one.", o:["backed out","backed up","backed down","backed off"], a:0, why:"back out = withdraw from an agreement."},
  {s:"I'll ___ the details with the client and let you know.", o:["sort out","sort through","sort of","sort in"], a:0, why:"sort out = arrange or resolve."},
  {s:"The compressor ___ in the middle of the night shift.", o:["broke down","broke up","broke off","broke in"], a:0, why:"break down = stop working (machines)."},
  {s:"We've ___ spare filters, so I've placed an urgent order.", o:["run out of","run into","run over","run through"], a:0, why:"run out of = have none left."},
  {s:"Can you ___ for me at the site meeting tomorrow?", o:["stand in","stand out","stand by","stand up"], a:0, why:"stand in for = replace someone temporarily."},
  {s:"Let's ___ the main risks before we sign anything.", o:["point out","point to","point at","point up"], a:0, why:"point out = draw attention to."},
  {s:"The inspection ___ several faults in the emergency lighting.", o:["turned up","turned down","turned over","turned in"], a:0, why:"turn up = be found, appear (also 'arrive')."},
  {s:"She ___ a brilliant idea to reduce downtime.", o:["came up with","came across","came down with","came round to"], a:0, why:"come up with = think of (an idea, plan)."},
  {s:"I ___ an old manual while I was clearing the office.", o:["came across","came up with","came about","came along"], a:0, why:"come across = find by chance."},
  {s:"We can't ___ safety checks just because we're behind schedule.", o:["cut back on","cut in","cut off","cut out"], a:0, why:"cut back on = reduce."},
  {s:"The client ___ our offer because it was over budget.", o:["turned down","turned up","turned off","turned out"], a:0, why:"turn down = reject."},
  {s:"It ___ that the fault was in the control panel, not the pump.", o:["turned out","turned up","turned over","turned into"], a:0, why:"it turned out that = it was discovered that."},
  {s:"I need to ___ my emails after the holiday.", o:["catch up on","catch on","catch out","catch at"], a:0, why:"catch up on = do something you've fallen behind with."},
  {s:"Please ___ the form and return it by Friday.", o:["fill in","fill up","fill out with","fill on"], a:0, why:"fill in (BrE) / fill out (AmE) a form."},
  {s:"Don't ___ — the supplier will call back soon.", o:["give up","give in","give away","give off"], a:0, why:"give up = stop trying."},
  {s:"Our manager ___ the new procedure at Monday's briefing.", o:["brought up","brought about","brought off","brought round"], a:0, why:"bring up = mention, raise a topic."},
  {s:"The delay was ___ a shortage of microchips.", o:["down to","up to","out to","off to"], a:0, why:"be down to = be caused by (BrE)."},
  {s:"It's ___ you whether we go with the cheaper option.", o:["up to","down to","on to","in to"], a:0, why:"be up to someone = their decision."},
  {s:"We need to ___ the root cause before we replace anything.", o:["figure out","figure on","figure in","figure up"], a:0, why:"figure out = understand, work out."},
  {s:"The new rules ___ next month, so update the procedures now.", o:["come into force","come into play","come into view","come into being"], a:0, why:"come into force = become legally valid."},
  {s:"Can we ___ the inspection to Tuesday? Thursday is too late.", o:["bring forward","bring back","bring in","bring on"], a:0, why:"bring forward = move to an earlier date."},
  {s:"Make sure you ___ the old parts properly — some contain oil.", o:["get rid of","get round to","get on with","get over"], a:0, why:"get rid of = dispose of."},
  {s:"I finally ___ updating the risk register.", o:["got round to","got rid of","got away with","got over"], a:0, why:"get round to = finally do something postponed."},
  {s:"Let's ___ the budget line by line.", o:["go through","go over to","go off","go along"], a:0, why:"go through = examine in detail."},
  {s:"He ___ the project when the previous manager left.", o:["took over","took up","took on","took in"], a:0, why:"take over = assume control."},
  {s:"We can't ___ any more work until the new technicians start.", o:["take on","take over","take off","take in"], a:0, why:"take on = accept work or responsibility; also hire."},
  {s:"The alarm keeps ___ for no reason.", o:["going off","going out","going down","going on"], a:0, why:"go off = (alarm) start ringing."},
  {s:"I'll ___ you ___ on the new software tomorrow.", o:["fill … in","fill … up","fill … out","fill … over"], a:0, why:"fill someone in = give them the information they're missing."},
  {s:"Profits have ___ since we automated the line.", o:["picked up","picked out","picked on","picked off"], a:0, why:"pick up = improve."},
  {s:"Can you ___ the latest version of the drawings?", o:["send over","send off","send up","send back for"], a:0, why:"send over = send to someone (informal)."},
  {s:"We've ___ a problem with the new access-control system.", o:["run into","run out","run over","run down"], a:0, why:"run into = encounter (a problem)."},
  {s:"The client wants us to ___ the costs for each phase.", o:["break down","break up","break through","break out"], a:0, why:"break down = divide into parts and explain."},
  {s:"I can't ___ that noise — what is it?", o:["make out","make up","make for","make off"], a:0, why:"make out = manage to hear/see/understand."},
  {s:"We should ___ the new technician — it's his first week.", o:["look out for","look up to","look down on","look into"], a:0, why:"look out for = take care of, protect."},
  {s:"Health and safety are ___ the complaint about the scaffolding.", o:["looking into","looking out","looking up","looking over to"], a:0, why:"look into = investigate."},
  {s:"I really ___ my old boss — she taught me everything.", o:["look up to","look down on","look after","look forward"], a:0, why:"look up to = admire, respect."},
  {s:"Sales ___ off after the summer, as usual.", o:["tailed","tailored","tapered up","tied"], a:0, why:"tail off = gradually decrease."}
];

/* ---------- Grammar in a flash (choose the correct form) ---------- */
BANK.gram = [
  {s:"If I ___ about the leak earlier, I would have called you.", o:["had known","knew","would know","have known"], a:0, why:"Third conditional: if + past perfect, would have + pp."},
  {s:"Not only ___ late, but he also forgot the drawings.", o:["did he arrive","he arrived","he did arrive","arrived he"], a:0, why:"Inversion after 'Not only' at the start: auxiliary + subject."},
  {s:"By the time we arrive, the technicians ___ the panel.", o:["will have replaced","will replace","have replaced","replaced"], a:0, why:"Future perfect: completed before a future moment."},
  {s:"I'd rather you ___ the client yourself.", o:["called","call","will call","to call"], a:0, why:"would rather + subject + past simple (present meaning)."},
  {s:"It's high time we ___ the old system.", o:["replaced","replace","will replace","are replacing"], a:0, why:"It's (high) time + past simple."},
  {s:"She suggested ___ the inspection to Monday.", o:["moving","to move","we to move","move"], a:0, why:"suggest + -ing (or 'that we move')."},
  {s:"Hardly ___ the meeting started when the fire alarm went off.", o:["had","has","did","was"], a:0, why:"Hardly had + subject + pp … when."},
  {s:"The report ___ by the time the director arrives.", o:["will have been finished","will finish","is finishing","has finished"], a:0, why:"Future perfect passive."},
  {s:"I'm used to ___ early for site visits.", o:["getting up","get up","got up","have got up"], a:0, why:"be used to + -ing = be accustomed to."},
  {s:"We ___ have ordered the parts earlier — now we're stuck.", o:["should","must","would","can"], a:0, why:"should have + pp = criticism of a past action."},
  {s:"He ___ have left already; his car isn't here.", o:["must","should","can","would"], a:0, why:"must have + pp = logical deduction about the past."},
  {s:"___ the bad weather, the crane work went ahead.", o:["Despite","Although","However","In spite"], a:0, why:"Despite + noun. 'In spite' needs 'of'."},
  {s:"I wish I ___ more time to prepare the presentation.", o:["had","have","would have","will have"], a:0, why:"wish + past simple for present regret."},
  {s:"I wish the supplier ___ answering my emails.", o:["would stop ignoring","stopped to ignore","stops ignoring","will stop ignoring"], a:0, why:"wish + would for annoying behaviour of others."},
  {s:"The engineer ___ I spoke to was very helpful.", o:["who","which","whose","what"], a:0, why:"who/that for people. 'what' is never a relative pronoun here."},
  {s:"This is the site ___ the accident happened.", o:["where","which","that","what"], a:0, why:"where = in which (place)."},
  {s:"Had we checked the pressure, the valve ___ failed.", o:["wouldn't have","won't have","didn't","hadn't"], a:0, why:"Inverted third conditional: Had we… , would(n't) have + pp."},
  {s:"The more you practise, ___ you'll become.", o:["the more fluent","more fluent","the most fluent","the fluent"], a:0, why:"The + comparative …, the + comparative."},
  {s:"She's been working here ___ 2019.", o:["since","for","from","during"], a:0, why:"since + point in time; for + period."},
  {s:"We need someone ___ can speak to the client in English.", o:["who","which","whom","whose"], a:0, why:"Subject relative pronoun for people."},
  {s:"Neither the manager nor the technicians ___ aware of the change.", o:["were","was","is","has been"], a:0, why:"Neither … nor: verb agrees with the nearer subject (technicians → were)."},
  {s:"I look forward to ___ from you.", o:["hearing","hear","heard","have heard"], a:0, why:"look forward to + -ing ('to' is a preposition)."},
  {s:"The contract, ___ was signed last week, includes penalties.", o:["which","that","what","who"], a:0, why:"Non-defining relative clause (with commas): which, never that."},
  {s:"You ___ wear a helmet on site — it's compulsory.", o:["have to","don't have to","needn't","might"], a:0, why:"have to = external obligation."},
  {s:"You ___ print the report; I'll read it on screen.", o:["needn't","mustn't","can't","shouldn't to"], a:0, why:"needn't = no obligation. mustn't = prohibited."},
  {s:"___ he's experienced, he still double-checks everything.", o:["Even though","Despite","In spite of","Even"], a:0, why:"Even though + clause."},
  {s:"The parts are expected ___ on Monday.", o:["to arrive","arriving","arrive","that arrive"], a:0, why:"be expected + to-infinitive."},
  {s:"No sooner ___ the system than it crashed.", o:["had we installed","we had installed","did we installed","we installed"], a:0, why:"No sooner had + subject + pp … than."},
  {s:"It was the supplier, not us, ___ made the mistake.", o:["who","which","what","whom"], a:0, why:"Cleft sentence: It was X who/that…"},
  {s:"What we need ___ a clear plan.", o:["is","are","be","were"], a:0, why:"Pseudo-cleft: What … is + noun phrase (singular verb)."},
  {s:"I'll call you as soon as I ___ the results.", o:["get","will get","got","would get"], a:0, why:"Future time clauses (as soon as, when) take present simple."},
  {s:"He denied ___ the safety procedure.", o:["skipping","to skip","skip","that skipping"], a:0, why:"deny + -ing."},
  {s:"We managed ___ the deadline in the end.", o:["to meet","meeting","meet","for meeting"], a:0, why:"manage + to-infinitive."},
  {s:"The building ___ when the fire broke out.", o:["was being renovated","renovated","was renovating","has been renovated"], a:0, why:"Past continuous passive: an action in progress."},
  {s:"Little ___ that the inspector was watching.", o:["did they know","they knew","knew they","they did know"], a:0, why:"Inversion after 'Little' (negative adverb)."},
  {s:"Should you ___ any problems, call the helpdesk.", o:["have","had","having","to have"], a:0, why:"Inverted first conditional: Should + subject + bare infinitive."},
  {s:"He talks as if he ___ the boss.", o:["were","is being","be","had"], a:0, why:"as if + past (were) for unreal comparison."},
  {s:"I'd sooner ___ by train than drive in this weather.", o:["go","going","to go","went"], a:0, why:"would sooner/rather + bare infinitive (same subject)."},
  {s:"There's no point ___ the meeting if the client can't come.", o:["in having","to have","have","for have"], a:0, why:"There's no point (in) + -ing."},
  {s:"The fewer mistakes you make, ___ the review will be.", o:["the shorter","shorter","the shortest","the more short"], a:0, why:"Double comparative."}
];
