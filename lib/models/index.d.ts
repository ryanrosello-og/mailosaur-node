/**
 * Contact information for a message sender or recipient.
 */
export interface MessageAddress {
  /**
   * Display name, if one is specified.
   */
  name?: string;
  /**
   * Email address (applicable to email messages).
   */
  email?: string;
  /**
   * Phone number (applicable to SMS messages).
   */
  phone?: string;
}

/**
 * Data associated with a hyperlink found within an email or SMS message.
 */
export interface Link {
  /**
   * The URL for the link.
   */
  href?: string;
  /**
   * The display text of the link. This is particular useful for understanding how a
   * link was displayed within HTML content.
   */
  text?: string;
}

/**
 * Data associated with an image found within a message.
 */
export interface Image {
  /**
   * The value of the `src` attribute of the image.
   */
  src?: string;
  /**
   * The `alt` text (alternative text), used to describe the image.
   */
  alt?: string;
}

/**
 * The content of the message.
 */
export interface MessageContent {
  /**
   * Any hyperlinks found within this content.
   */
  links?: Link[];
  /**
   * Any images found within this content.
   */
  images?: Image[];
  /**
   * The HTML or plain text body of the message.
   */
  body?: string;
}

/**
 * Describes a message attachment.
 */
export interface Attachment {
  /**
   * Unique identifier for the attachment.
   */
  id: string;
  /**
   * The MIME type of the attachment.
   */
  contentType?: string;
  /**
   * The filename of the attachment.
   */
  fileName?: string;
  /**
   * The base64-encoded content of the attachment. Note: This is only populated when sending attachments.
   */
  content?: string;
  /**
   * The content identifier (for attachments that are embedded within the body of the message).
   */
  contentId?: string;
  /**
   * The file size, in bytes.
   */
  length?: number;
  /**
   * The URL from which the attachment can be downloaded.
   */
  url?: string;
}

/**
 * Message header key/value pair.
 */
export interface MessageHeader {
  /**
   * Header key.
   */
  field?: string;
  /**
   * Header value.
   */
  value?: string;
}

/**
 * Further metadata related to the message, including email headers.
 */
export interface Metadata {
  /**
   * Message headers
   */
  headers?: MessageHeader[];
  /**
   * The fully-qualified domain name or IP address that was provided with the
   * Extended HELLO (EHLO) or HELLO (HELO) command. This value is generally
   * used to identify the SMTP client.
   * https://datatracker.ietf.org/doc/html/rfc5321#section-4.1.1.1
   */
  ehlo: string;
  /**
   * The source mailbox/email address, referred to as the 'reverse-path',
   * provided via the MAIL command during the SMTP transaction.
   * https://datatracker.ietf.org/doc/html/rfc5321#section-4.1.1.2
   */
  mailFrom?: string;
  /**
   * The recipient email addresses, each referred to as a 'forward-path',
   * provided via the RCPT command during the SMTP transaction.
   * https://datatracker.ietf.org/doc/html/rfc5321#section-4.1.1.3
   */
  rcptTo?: MessageAddress[];

}

/**
 * The email or SMS message processed by Mailosaur.
 */
export interface Message {
  /**
   * Unique identifier for the message.
   */
  id?: string;
  /**
   * The sender of the message.
   */
  from?: MessageAddress[];
  /**
   * The recipients of the message.
   */
  to?: MessageAddress[];
  /**
   * Carbon-copied recipients for email messages.
   */
  cc?: MessageAddress[];
  /**
   * Blind carbon-copied recipients for email messages.
   */
  bcc?: MessageAddress[];
  /**
   * The date/time that this message was received by Mailosaur.
   */
  received?: Date;
  /**
   * The subject of the message.
   */
  subject?: string;
  /**
   * Message content that was sent in HTML format.
   */
  html?: MessageContent;
  /**
   * Message content that was sent in plain text format.
   */
  text?: MessageContent;
  /**
   * An array of attachment metadata for any attached files.
   */
  attachments?: Attachment[];
  /**
   * Further metadata related to the message, including email headers.
   */
  metadata?: Metadata;
  /**
   * Identifier for the server in which the message is located.
   */
  server?: string;
}

/**
 * A summary of the message processed by Mailosaur. This summary does not include
 * the contents of the email or SMS message, for which you will need the full
 * message object.
 */
export interface MessageSummary {
  /**
   * Unique identifier for the message.
   */
  id: string;
  /**
   * The sender of the message.
   */
  from?: MessageAddress[];
  /**
   * The recipients of the message.
   */
  to?: MessageAddress[];
  /**
   * Carbon-copied recipients for email messages.
   */
  cc?: MessageAddress[];
  /**
   * Blind carbon-copied recipients for email messages.
   */
  bcc?: MessageAddress[];
  /**
   * The date/time that this message was received by Mailosaur.
   */
  received?: Date;
  /**
   * The subject of the message.
   */
  subject?: string;
  /**
   * A short, summarized version of the message content.
   */
  summary?: string;
  /**
   * The number of attachments associated with the message.
   */
  attachments?: number;
  /**
   * Identifier for the server in which the message is located.
   */
  server?: string;
}

/**
 * The result of a message listing request.
 */
export interface MessageListResult {
  /**
   * The individual summaries of each message forming the
   * result. Summaries are returned sorted by received date, with the most
   * recently-received messages appearing first.
   */
  items?: MessageSummary[];
}

/**
 * The criteria with which to find messages during a search.
 */
export interface SearchCriteria {
  /**
   * The full email address (or phone number for SMS) from which the target message was sent.
   */
  sentFrom?: string;
  /**
   * The full email address (or phone number for SMS) to which the target message was sent.
   */
  sentTo?: string;
  /**
   * The value to seek within the subject line of a target email.
   */
  subject?: string;
  /**
   * The value to seek within the body of the target message.
   */
  body?: string;
  /**
   * If set to `ALL` (default), then only results that match all specified criteria will be returned.
   * If set to `ANY`, results that match any of the specified criteria will be returned.
   */
  match?: "ALL" | "ANY";
}

/**
 * Search options
 */
export interface SearchOptions {
  /**
   * Specify how long to wait for a matching result (in milliseconds, default value is 10 seconds).
   */
  timeout?: number,
  /**
   * Limits results to only messages received after this date/time (default 1 hour ago).
   */
  receivedAfter?: Date,
  /**
   * Used alongside `itemsPerPage` to paginate through results. This is zero-based, meaning `0` is the first page of results.
   */
  page?: number,
  /**
   * A limit on the number of results to be returned. This can be set between `1` and `1000`, with the default being `50`.
   */
  itemsPerPage?: number,
  /**
   * When using the 'get' method, this option can be used to prevent an error being thrown if no matching message is found in time.
   */
  suppressError?: boolean
}

/**
 * Message listing options
 */
export interface MessageListOptions {
  /**
   * Limits results to only messages received after this date/time (default 1 hour ago).
   */
  receivedAfter?: Date,
  /**
   * Used alongside `itemsPerPage` to paginate through results. This is zero-based, meaning `0` is the first page of results.
   */
  page?: number,
  /**
   * A limit on the number of results to be returned. This can be set between `1` and `1000`, with the default being `50`.
   */
  itemsPerPage?: number
}

/**
 * Options to use when creating a new message.
 */
export interface MessageCreateOptions {
  /**
   * The email address to which the email will be sent. Must be a verified email address.
   */
  to?: string;
  /**
   * If true, email will be sent upon creation.
   */
  send?: boolean;
  /**
   * The email subject line.
   */
  subject?: string;
  /**
   * The plain text body of the message. Note that only text or html can be supplied, not both.
   */
  text?: string;
  /**
   * The HTML body of the message. Note that only text or html can be supplied, not both.
   */
  html?: string;
  /**
   * Any message attachments.
   */
  attachments?: Attachment[];
}

/**
 * Options to use when forwarding a message.
 */
export interface MessageForwardOptions {
  /**
   * The email address to which the email will be sent. Must be a verified email address.
   */
  to: string;
  /**
   * Any plain text to include when forwarding the message. Note that only text or html can be supplied, not both.
   */
  text?: string;
  /**
   * Any HTML content to include when forwarding the message. Note that only text or html can be supplied, not both.
   */
  html?: string;
}

/**
 * Options to use when replying to a message.
 */
export interface MessageReplyOptions {
  /**
   * Any additional plain text content to include in the reply. Note that only text or html can be supplied, not both.
   */
  text?: string;
  /**
   * Any additional HTML content to include in the reply. Note that only html or text can be supplied, not both.
   */
  html?: string;
  /**
   * Any message attachments.
   */
  attachments?: Attachment[];
}

/**
 * Mailosaur virtual SMTP/SMS server.
 */
export interface Server {
  /**
   * Unique identifier for the server.
   */
  id?: string;
  /**
   * The name of the server.
   */
  name?: string;
  /**
   * Users (excluding administrators) who have access to the server (if it is restricted).
   */
  users?: string[];
  /**
   * The number of messages currently in the server.
   */
  messages?: number;
}

/**
 * Options used to create a new Mailosaur server.
 */
export interface ServerCreateOptions {
  /**
   * A name used to identify the server.
   */
  name?: string;
}

/**
 * The result of the server listing operation.
 */
export interface ServerListResult {
  /**
   * The individual servers forming the result. Servers
   * are returned sorted by creation date, with the most recently-created server
   * appearing first.
   */
  items?: Server[];
}

/**
 * Search options
 */
export interface SearchOptions {
  /**
   * Specify how long to wait for a matching result (in milliseconds, default value is 10 seconds).
   */
  timeout?: number,
  /**
   * Limits results to only messages received after this date/time (default 1 hour ago).
   */
  receivedAfter?: Date,
  /**
   * Used alongside `itemsPerPage` to paginate through results. This is zero-based, meaning `0` is the first page of results.
   */
  page?: number,
  /**
   * A limit on the number of results to be returned. This can be set between `1` and `1000`, with the default being `50`.
   */
  itemsPerPage?: number,
  /**
   * When using the 'get' method, this option can be used to prevent an error being thrown if no matching message is found in time.
   */
  suppressError?: boolean
}

/**
 * The result of an individual Spam Assassin rule
 */
export interface SpamAssassinRule {
  /**
   * Spam Assassin rule score.
   */
  score?: number;
  /**
   * Spam Assassin rule name.
   */
  rule?: string;
  /**
   * Spam Assassin rule description.
   */
  description?: string;
}

/**
 * Results for this email against various spam filters.
 */
export interface SpamFilterResults {
  /**
   * Spam Assassin filter results.
   */
  spamAssassin?: SpamAssassinRule[];
}

/**
 * The results of spam analysis performed by Mailosaur.
 */
export interface SpamAnalysisResult {
  /**
   * Spam filter results.
   */
  spamFilterResults?: SpamFilterResults;
  /**
   * Overall Mailosaur spam score.
   */
  score?: number;
}

/**
 * The detail of an individual account limit.
 */
export interface UsageAccountLimit {
  /**
   * The limit for your account.
   */
  limit?: number;
  /**
   * Your account usage so far.
   */
  current?: number;
}

/**
 * The current limits and usage for your account.
 */
export interface UsageAccountLimits {
  /**
   * Server limits.
   */
  servers?: UsageAccountLimit;
  /**
   * User limits.
   */
  users?: UsageAccountLimit;
  /**
   * Emails per day limits.
   */
  email?: UsageAccountLimit;
  /**
   * SMS message per month limits.
   */
  sms?: UsageAccountLimit;
}

/**
 * Usage transaction.
 */
export interface UsageTransaction {
  /**
   * The date/time of the transaction.
   */
  timestamp?: Date;
  /**
   * The number of emails.
   */
  email?: number;
  /**
   * The number of SMS messages.
   */
  sms?: number;
}

/**
 * Usage transactions from your account.
 */
export interface UsageTransactionListResult {
  /**
   * The individual transactions that have occurred.
   */
  items?: UsageTransaction[];
}

/**
 * @class
 * Initializes a new instance of the MailosaurError class.
 * @constructor
 * @member {string} [errorType]
 * @member {number} [httpStatusCode]
 * @member {string} [httpResponseBody]
 */
export interface MailosaurError {
  errorType?: string;
  httpStatusCode?: number;
  httpResponseBody?: string;
}
