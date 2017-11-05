module.exports = async (notificationEmitter) => {
  /**
   * After create invoice hook
   * Create a new timeline event
   */
  notificationEmitter.on('invoice:create:timeline', async ({ invoice, models }) => {
    // If bulk
    if (JSON.parse(JSON.stringify(Array.isArray(invoice)))) {
      const newInvoice = JSON.parse(JSON.stringify(invoice));
      newInvoice.map(async (cur, index) => {
        // Create timeline object
        const timeline = {
          title: 'Invoice Received',
          invoiceId: cur.id,
          accountId: cur.accountId,
        }

        await models.Timeline.create(timeline);
      });
      return;
    }

    const newInvoice = JSON.parse(JSON.stringify(invoice));

    // Create timeline object
    const timeline = {
      title: 'Invoice Received',
      invoiceId: newInvoice.id,
      accountId: newInvoice.accountId,
    }


    // console.log('timeline', timeline);
    // Create timeline in DB
    await models.Timeline.create({ ...timeline });
  });
};
