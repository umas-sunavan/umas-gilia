// ----------------------------------------------------------------------

import { TranscriptData } from 'src/types/transcript';

export async function GET(request: Request) {
  const mockTranscript: TranscriptData = {
    length: 203,
    sections: [
      {
        sectionTitle: 'Before We Begin',
        sectionTranscripts: [
          {
            id: 0,
            time: '00:00:00',
            text: 'Welcome to our tour! Today, we will explore some fascinating places and learn about their history.',
          },
          {
            id: 1,
            time: '00:00:04',
            text: 'Here we have the ancient ruins, dating back to the 12th century.',
          },
          {
            id: 2,
            time: '00:00:05',
            text: 'Notice the intricate carvings on the walls, each telling a unique story.',
          },
        ],
      },
      {
        sectionTitle: 'Tour Begins',
        sectionTranscripts: [
          {
            id: 3,
            time: '00:00:07',
            text: 'Welcome to our tour! Today, we will explore some fascinating places and learn about their history.',
          },
          {
            id: 4,
            time: '00:00:10',
            text: 'Here we have the ancient ruins, dating back to the 12th century.',
          },
          {
            id: 5,
            time: '00:00:11',
            text: 'Notice the intricate carvings on the walls, each telling a unique story.',
          },
          {
            id: 6,
            time: '00:00:12',
            text: "As we move forward, you'll see the grand entrance, which was once guarded by soldiers.",
          },
          {
            id: 7,
            time: '00:00:13',
            text: 'This area was used for various ceremonies and gatherings.',
          },
          {
            id: 8,
            time: '00:00:14',
            text: 'Look at the beautiful mosaic on the floor, made from thousands of tiny tiles.',
          },
          {
            id: 9,
            time: '00:00:15',
            text: "To your left, you'll notice the remains of an ancient marketplace.",
          },
          {
            id: 10,
            time: '00:00:16',
            text: 'This marketplace was a bustling hub of activity in its prime.',
          },
          {
            id: 11,
            time: '00:00:41',
            text: 'Ahead, you can see the old watchtower, offering a panoramic view of the surroundings.',
          },
          {
            id: 12,
            time: '00:00:43',
            text: 'The watchtower was crucial for spotting incoming visitors or potential threats.',
          },
          {
            id: 13,
            time: '00:00:48',
            text: "On your right, there's a small chapel, known for its beautiful stained glass windows.",
          },
          {
            id: 14,
            time: '00:00:49',
            text: 'The chapel was a place of worship and reflection for the inhabitants.',
          },
          {
            id: 15,
            time: '00:00:51',
            text: 'Next, we have the royal gardens, which were meticulously maintained.',
          },
          {
            id: 16,
            time: '00:00:52',
            text: 'The gardens feature a variety of plants and flowers, some of which are quite rare.',
          },
          {
            id: 17,
            time: '00:00:53',
            text: "You'll also find a serene pond in the center of the gardens.",
          },
          {
            id: 18,
            time: '00:00:58',
            text: 'The pond was home to various species of fish and waterfowl.',
          },
          {
            id: 19,
            time: '00:00:59',
            text: 'Moving on, we come to the grand hall, where many important events took place.',
          },
          {
            id: 20,
            time: '00:01:04',
            text: 'The grand hall is known for its impressive architecture and acoustics.',
          },
          {
            id: 21,
            time: '00:01:06',
            text: 'Notice the large chandelier hanging from the ceiling, a true masterpiece.',
          },
          {
            id: 22,
            time: '00:01:06',
            text: 'The chandelier was crafted by skilled artisans and is adorned with crystals.',
          },
          {
            id: 23,
            time: '00:01:07',
            text: "As we exit the grand hall, you'll see the library, which housed many ancient texts.",
          },
          {
            id: 24,
            time: '00:01:10',
            text: 'The library was a center of knowledge and learning for the community.',
          },
          {
            id: 25,
            time: '00:01:16',
            text: 'Finally, we arrive at the courtyard, a place for relaxation and social gatherings.',
          },
          {
            id: 26,
            time: '00:01:17',
            text: 'The courtyard is surrounded by beautiful arches and columns, adding to its charm.',
          },
        ],
      },
      {
        sectionTitle: 'Conclusion',
        sectionTranscripts: [
          {
            id: 27,
            time: '00:01:18',
            text: 'This concludes our tour. We hope you enjoyed exploring these historical sites with us.',
          },
          {
            id: 28,
            time: '00:01:18',
            text: 'Feel free to ask any questions or revisit any part of the tour at your leisure.',
          },
          {
            id: 29,
            time: '00:01:30',
            text: 'Thank you for joining us, and we look forward to seeing you again soon!',
          },
          {
            id: 30,
            time: '00:01:31',
            text: 'Welcome to our tour! Today, we will explore some fascinating places and learn about their history.',
          },
          {
            id: 31,
            time: '00:01:31',
            text: 'Different text of the transcript at this time.',
          },
          {
            id: 32,
            time: '00:01:39',
            text: 'Different text of the transcript at this time.',
          },
        ],
      },
    ],
  };
  return Response.json(mockTranscript);
}
