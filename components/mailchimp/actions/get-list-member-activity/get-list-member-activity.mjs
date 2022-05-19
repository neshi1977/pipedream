import { removeNullEntries } from "../../common/utils.mjs";
import mailchimp from "../../mailchimp.app.mjs";

export default {
  key: "mailchimp-get-a-list",
  name: "List List Members Activities",
  description: "Get the last 50 events of a member's activity on a specific list. [See docs here](https://mailchimp.com/developer/marketing/api/list-activity/view-recent-activity-50/)",
  version: "0.0.1",
  type: "action",
  props: {
    mailchimp,
    listId: {
      type: "string",
      label: "List id",
      description: "The unique id for the list.",
    },
    subscriberHash: {
      type: "string",
      label: "Subscriber hash",
      description: "The MD5 hash of the lowercase version of the list member's email address. This endpoint also accepts a list member's email address or contact_id.",
    },
    fields: {
      type: "string[]",
      label: "Fields",
      description: "A string list of fields to return. Reference parameters of sub-objects with dot notation.",
      default: [],
      optional: true,
    },
    excludeFields: {
      type: "string[]",
      label: "Exclude Fields",
      description: "A string list of fields to exclude_fields. Reference parameters of sub-objects with dot notation.",
      default: [],
      optional: true,
    },
    action: {
      type: "object",
      label: "Action",
      description: "A comma seperated list of actions to return. Possible values: abuse, bounce, click, open, sent, unsub, or ecomm.",
      optional: true,
      default: {},
    },
  },
  async run({ $ }) {
    const payload = removeNullEntries({
      listId: this.listId,
      fields: this.fields.join(","),
      exclude_fields: this.excludeFields.join(","),
      action: this.action,
      subscriberHash: this.subscriberHash,
    });
    const response = await this.mailchimp.getListMemberActivities($, payload);
    response && $.export("$summary", "List member's activities found");
    return response;
  },
};
