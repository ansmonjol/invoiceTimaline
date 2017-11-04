import { session } from 'shared/session'
import { Query } from 'shared/graph/query'
import { graph } from 'shared/graph'
import { Storage } from 'shared/storage'

export function updaterTour(elt) {
  const { userId } = session();
  const oneUser = new Query('oneUser', { id: userId });
  oneUser.props('id', 'tour');
  graph(` { ${oneUser.toString()} } `).then((data) => {
    // If no tour already saved
    if (!data.oneUser.tour) {
      data.oneUser.tour = {}
    }

    // Set tour to true
    data.oneUser.tour[elt] = true;

    // Update current session
    const s = Storage.get('meCurrent');
    if (s && s.user) s.user.tour = data.oneUser.tour;
    Storage.set('meCurrent', s);

    // Update user tour
    const updateUser = new Query('updateUser', { id: userId, tour: data.oneUser.tour });
    updateUser.props('id');
    graph(` { ${updateUser.toString()} } `);
  });
}
