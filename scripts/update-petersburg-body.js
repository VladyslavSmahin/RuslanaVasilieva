import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const contentPath = path.join(__dirname, '..', 'public', 'data', 'content.json')

const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'))
const post = content.posts.find((p) => p.id === 'petersburg')
if (!post) throw new Error('petersburg post not found')

post.body = {
  ru: `Питер — один из тех городов, которые легко узнаются с первого кадра: реки, каналы, мосты, гранитные набережные и огромный пласт истории буквально на каждом шагу. Это второй по величине город России и бывшая столица империи, поэтому здесь особенно много дворцов, соборов и зданий, которые создают то самое ощущение «северной парадности».

Город основал Пётр I в 1703 году, и уже сам этот факт многое объясняет: Петербург с самого начала задумывался не как обычный город, а как масштабный европейский проект. Отсюда его строгая планировка, широкие проспекты, торжественная архитектура и особое внимание к воде. Нева здесь не просто река, а главный характер города. А еще Петербург часто называют городом мостов: их здесь сотни, и многие приезжают специально посмотреть на разводные мосты — это до сих пор одна из самых эффектных городских традиций.

Одна из самых известных особенностей Питера — белые ночи. В конце мая и в июне темнота почти не наступает, и город выглядит совершенно иначе: мягкий свет держится до глубокой ночи, люди гуляют до утра, а обычная прогулка по центру превращается почти в отдельное впечатление. Именно в этот период Петербург особенно красив и особенно живой.

Здесь находится Государственный Эрмитаж — один из крупнейших музеев мира. Даже если человек далек от искусства, масштабы этого места впечатляют сами по себе. Но Петербург интересен не только громкими символами вроде Эрмитажа, Исаакиевский собор или Петропавловская крепость. У него сильная литературная биография: с этим городом связаны Александр Пушкин, Фёдор Достоевский, Николай Гоголь, Анна Ахматова и Иосиф Бродский. Поэтому иногда возникает ощущение, что ты гуляешь не только по городу, но и по страницам книг.

Но у Петербурга есть и другая сторона — непарадная. Она начинается буквально за фасадами дворцов. Стоит свернуть во двор-колодец старого доходного дома — и город становится совсем другим: тише, чуть темнее, с облупившейся штукатуркой, старыми лестницами и окнами, за которыми идет обычная жизнь. Здесь сушат белье на верёвках, во дворах разговаривают соседи, а внизу часто прячутся маленькие бары или кофейни, которые знают только местные.

В этой повседневной части города особенно чувствуется, чем живёт Петербург. Это один из самых творческих городов России. Здесь много музыкантов, художников, фотографов, писателей, дизайнеров — людей, которые могут часами сидеть в маленьких кофейнях с ноутбуком или блокнотом. В городе легко встретить уличных музыкантов, небольшие галереи или независимые театры. Возможно, дело в климате: длинные серые дни и дождливая погода будто сами подталкивают к размышлениям и творчеству.

Есть и своя городская гастрономия. Петербург сложно назвать столицей какой-то одной кухни, но у него есть собственные привычки. Например, легендарная питерская шаверма — здесь её принципиально называют именно так. Уличные киоски с шавермой можно встретить почти на каждом углу, и для многих это такой же символ города, как кофе навынос из маленьких кофеен. Вообще кофейная культура здесь очень сильная: кажется, что в Петербурге кофеен больше, чем солнечных дней.

Отдельная часть городской жизни — футбол. Для местных жителей Зенит — не просто клуб, а важная часть городской идентичности. В дни матчей вокруг стадиона Газпром Арена собираются тысячи болельщиков, и город буквально окрашивается в сине-бело-голубые цвета. Даже те, кто далёк от футбола, всё равно чувствуют эту атмосферу: разговоры о матчах слышны в барах, метро и такси.

И, пожалуй, именно в этом сочетании — главная особенность Петербурга. С одной стороны, это имперская архитектура, дворцы и музеи мирового уровня. С другой — дворы, кофейни, творческие люди, футбол, дождь и неспешные разговоры до поздней ночи.

Поэтому Петербург редко производит впечатление просто красивого города. Он скорее оставляет ощущение сложного, немного меланхоличного, но очень живого места — города, который не только показывают туристам, но и по-настоящему проживают каждый день его жители.`.replace(/\n\n/g, '\\n\\n').replace(/\n/g, ' '),
  en: `St Petersburg is one of those cities you recognise from the first frame: rivers, canals, bridges, granite embankments and a huge layer of history at every step. It is Russia's second-largest city and the former imperial capital, so there are especially many palaces, cathedrals and buildings that create that very sense of "northern grandeur".

The city was founded by Peter the Great in 1703, and that fact alone explains a lot: from the start Petersburg was conceived not as an ordinary city but as a large-scale European project. Hence its strict layout, wide avenues, solemn architecture and special attention to water. Here the Neva is not just a river but the main character of the city. Petersburg is also often called the city of bridges: there are hundreds of them, and many people come specifically to see the drawbridges — it remains one of the most striking urban traditions.

One of the best-known features of Petersburg is the white nights. In late May and June darkness barely falls, and the city looks completely different: a soft light lasts well into the night, people stroll until morning, and an ordinary walk through the centre turns into an experience in itself. It is in this period that Petersburg is at its most beautiful and most alive.

The State Hermitage — one of the world's largest museums — is here. Even if you are far from art, the scale of the place is impressive in itself. But Petersburg is not only about famous landmarks like the Hermitage, St Isaac's Cathedral or the Peter and Paul Fortress. It has a strong literary biography: Alexander Pushkin, Fyodor Dostoevsky, Nikolai Gogol, Anna Akhmatova and Joseph Brodsky are all linked to this city. So sometimes you have the feeling that you are walking not only through a city but through the pages of books.

But Petersburg has another side too — the non-ceremonial one. It begins literally behind the façades of the palaces. Turn into the well courtyard of an old tenement building and the city becomes quite different: quieter, a little darker, with peeling plaster, old stairways and windows behind which ordinary life goes on. Here laundry is hung on lines, neighbours talk in the courtyards, and downstairs you often find small bars or cafés that only locals know.

In this everyday part of the city you especially feel what Petersburg lives by. It is one of the most creative cities in Russia. There are many musicians, artists, photographers, writers, designers — people who can sit for hours in small cafés with a laptop or notebook. In the city you easily come across street musicians, small galleries or independent theatres. Perhaps it's the climate: long grey days and rainy weather seem to encourage reflection and creativity.

There is a distinct urban gastronomy too. Petersburg is hard to call the capital of any one cuisine, but it has its own habits. For example, the legendary Petersburg shawarma — here they insist on calling it just that. Street shawarma stalls can be found on almost every corner, and for many they are as much a symbol of the city as takeaway coffee from small cafés. Coffee culture in general is very strong here: it sometimes seems there are more coffee shops in Petersburg than sunny days.

Football is a separate part of city life. For locals, Zenit is not just a club but an important part of the city's identity. On match days thousands of fans gather around the Gazprom Arena stadium, and the city is literally painted in blue, white and light blue. Even those who are not into football still feel the atmosphere: talk of matches is heard in bars, the metro and taxis.

And perhaps it is in this combination that Petersburg's main feature lies. On one side, imperial architecture, palaces and museums of world standing. On the other — courtyards, cafés, creative people, football, rain and unhurried conversations late into the night.

So Petersburg rarely leaves the impression of simply a beautiful city. It is more like a complex, slightly melancholic but very much alive place — a city that is not only shown to tourists but truly lived in every day by its inhabitants.`.replace(/\n\n/g, '\\n\\n').replace(/\n/g, ' '),
  de: `Sankt Petersburg gehört zu den Städten, die man schon auf dem ersten Bild erkennt: Flüsse, Kanäle, Brücken, Granitufer und eine gewaltige Schicht Geschichte buchstäblich auf jedem Schritt. Es ist die zweitgrößte Stadt Russlands und ehemalige Hauptstadt des Imperiums, deshalb gibt es hier besonders viele Paläste, Kathedralen und Bauten, die genau dieses Gefühl von "nördlicher Repräsentation" erzeugen.

Die Stadt wurde 1703 von Peter dem Großen gegründet, und dieser Fakt allein erklärt vieles: Petersburg war von Anfang an nicht als gewöhnliche Stadt gedacht, sondern als groß angelegtes europäisches Projekt. Daher die strenge Planung, breiten Prospekte, feierliche Architektur und die besondere Aufmerksamkeit für das Wasser. Die Newa ist hier nicht nur ein Fluss, sondern der Hauptcharakter der Stadt. Petersburg wird oft auch die Stadt der Brücken genannt: Es gibt Hunderte davon, und viele kommen extra, um die Klappbrücken zu sehen — das ist bis heute eine der eindrucksvollsten urbanen Traditionen.

Eine der bekanntesten Besonderheiten von Petersburg sind die Weißen Nächte. Ende Mai und im Juni wird es kaum dunkel, und die Stadt wirkt völlig anders: weiches Licht bis tief in die Nacht, Menschen spazieren bis in den Morgen, und ein normaler Spaziergang durch die Innenstadt wird fast zu einem eigenen Erlebnis. Gerade in dieser Zeit ist Petersburg besonders schön und besonders lebendig.

Hier befindet sich die Eremitage — eines der größten Museen der Welt. Selbst wenn man Kunst fernsteht, beeindruckt der Maßstab dieses Ortes für sich. Aber Petersburg lebt nicht nur von lauten Symbolen wie Eremitage, Isaakskathedrale oder Peter-und-Paul-Festung. Die Stadt hat eine starke literarische Biografie: Mit ihr verbunden sind Alexander Puschkin, Fjodor Dostojewski, Nikolai Gogol, Anna Achmatowa und Joseph Brodski. Deshalb hat man manchmal das Gefühl, nicht nur durch eine Stadt, sondern durch Buchseiten zu gehen.

Aber Petersburg hat auch eine andere Seite — die nichtrepräsentative. Sie beginnt buchstäblich hinter den Fassaden der Paläste. Biegt man in den Brunnenhof eines alten Mietshauses ein, wird die Stadt ganz anders: ruhiger, etwas dunkler, mit abgeblättertem Putz, alten Treppen und Fenstern, hinter denen der ganz normale Alltag stattfindet. Hier hängt Wäsche auf der Leine, in den Höfen unterhalten sich Nachbarn, und unten verstecken sich oft kleine Bars oder Cafés, die nur Einheimische kennen.

In diesem alltäglichen Teil der Stadt spürt man besonders, wovon Petersburg lebt. Es ist eine der kreativsten Städte Russlands. Hier gibt es viele Musiker, Künstler, Fotografen, Schriftsteller, Designer — Menschen, die stundenlang in kleinen Cafés mit Laptop oder Notizblock sitzen können. In der Stadt trifft man leicht auf Straßenmusiker, kleine Galerien oder unabhängige Theater. Vielleicht liegt es am Klima: lange graue Tage und Regenwetter scheinen geradezu zu Nachdenken und Kreativität zu verleiten.

Es gibt auch eine eigene städtische Gastronomie. Petersburg lässt sich schwer als Hauptstadt einer bestimmten Küche bezeichnen, aber die Stadt hat ihre eigenen Gewohnheiten. Zum Beispiel die legendäre Petersburger Schawarma — hier nennt man sie aus Prinzip genau so. Schawarma-Buden findet man an fast jeder Ecke, und für viele sind sie genauso ein Symbol der Stadt wie Kaffee zum Mitnehmen aus kleinen Cafés. Die Kaffeekultur ist hier insgesamt sehr stark: manchmal scheint es, in Petersburg gibt es mehr Cafés als Sonnentage.

Ein eigener Teil des Stadtlebens ist der Fußball. Für die Einheimischen ist Zenit nicht nur ein Verein, sondern ein wichtiger Teil der städtischen Identität. An Spieltagen versammeln sich Tausende Fans rund um die Gazprom-Arena, und die Stadt färbt sich buchstäblich in Blau-Weiß-Hellblau. Auch wer mit Fußball nichts anfängt, spürt diese Atmosphäre: Gespräche über Spiele hört man in Bars, U-Bahn und Taxis.

Und vielleicht liegt genau in dieser Mischung die Hauptbesonderheit Petersburgs. Einerseits imperiale Architektur, Paläste und Museen von Weltrang. Andererseits Höfe, Cafés, kreative Menschen, Fußball, Regen und gemächliche Gespräche bis spät in die Nacht.

Deshalb wirkt Petersburg selten wie einfach nur eine schöne Stadt. Es hinterlässt eher den Eindruck eines komplexen, etwas melancholischen, aber sehr lebendigen Ortes — einer Stadt, die nicht nur Touristen gezeigt wird, sondern die ihre Bewohner jeden Tag wirklich leben.`
}

fs.writeFileSync(contentPath, JSON.stringify(content, null, 2))
console.log('Petersburg body updated.')
