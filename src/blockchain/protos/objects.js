/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const BlockData = $root.BlockData = (() => {

    /**
     * Properties of a BlockData.
     * @exports IBlockData
     * @interface IBlockData
     * @property {number|Long|null} [height] BlockData height
     * @property {number|Long|null} [time] BlockData time
     * @property {string|null} [chainId] BlockData chainId
     * @property {string|null} [hash] BlockData hash
     * @property {string|null} [prevHash] BlockData prevHash
     * @property {string|null} [signature] BlockData signature
     * @property {Uint8Array|null} [payload] BlockData payload
     */

    /**
     * Constructs a new BlockData.
     * @exports BlockData
     * @classdesc Represents a BlockData.
     * @implements IBlockData
     * @constructor
     * @param {IBlockData=} [properties] Properties to set
     */
    function BlockData(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * BlockData height.
     * @member {number|Long} height
     * @memberof BlockData
     * @instance
     */
    BlockData.prototype.height = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * BlockData time.
     * @member {number|Long} time
     * @memberof BlockData
     * @instance
     */
    BlockData.prototype.time = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * BlockData chainId.
     * @member {string} chainId
     * @memberof BlockData
     * @instance
     */
    BlockData.prototype.chainId = "";

    /**
     * BlockData hash.
     * @member {string} hash
     * @memberof BlockData
     * @instance
     */
    BlockData.prototype.hash = "";

    /**
     * BlockData prevHash.
     * @member {string} prevHash
     * @memberof BlockData
     * @instance
     */
    BlockData.prototype.prevHash = "";

    /**
     * BlockData signature.
     * @member {string} signature
     * @memberof BlockData
     * @instance
     */
    BlockData.prototype.signature = "";

    /**
     * BlockData payload.
     * @member {Uint8Array} payload
     * @memberof BlockData
     * @instance
     */
    BlockData.prototype.payload = $util.newBuffer([]);

    /**
     * Creates a new BlockData instance using the specified properties.
     * @function create
     * @memberof BlockData
     * @static
     * @param {IBlockData=} [properties] Properties to set
     * @returns {BlockData} BlockData instance
     */
    BlockData.create = function create(properties) {
        return new BlockData(properties);
    };

    /**
     * Encodes the specified BlockData message. Does not implicitly {@link BlockData.verify|verify} messages.
     * @function encode
     * @memberof BlockData
     * @static
     * @param {IBlockData} message BlockData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    BlockData.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.height != null && message.hasOwnProperty("height"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.height);
        if (message.time != null && message.hasOwnProperty("time"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.time);
        if (message.chainId != null && message.hasOwnProperty("chainId"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.chainId);
        if (message.hash != null && message.hasOwnProperty("hash"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.hash);
        if (message.prevHash != null && message.hasOwnProperty("prevHash"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.prevHash);
        if (message.signature != null && message.hasOwnProperty("signature"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.signature);
        if (message.payload != null && message.hasOwnProperty("payload"))
            writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.payload);
        return writer;
    };

    /**
     * Encodes the specified BlockData message, length delimited. Does not implicitly {@link BlockData.verify|verify} messages.
     * @function encodeDelimited
     * @memberof BlockData
     * @static
     * @param {IBlockData} message BlockData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    BlockData.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a BlockData message from the specified reader or buffer.
     * @function decode
     * @memberof BlockData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {BlockData} BlockData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    BlockData.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BlockData();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.height = reader.uint64();
                break;
            case 2:
                message.time = reader.uint64();
                break;
            case 3:
                message.chainId = reader.string();
                break;
            case 4:
                message.hash = reader.string();
                break;
            case 5:
                message.prevHash = reader.string();
                break;
            case 6:
                message.signature = reader.string();
                break;
            case 7:
                message.payload = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a BlockData message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof BlockData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {BlockData} BlockData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    BlockData.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a BlockData message.
     * @function verify
     * @memberof BlockData
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    BlockData.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.height != null && message.hasOwnProperty("height"))
            if (!$util.isInteger(message.height) && !(message.height && $util.isInteger(message.height.low) && $util.isInteger(message.height.high)))
                return "height: integer|Long expected";
        if (message.time != null && message.hasOwnProperty("time"))
            if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                return "time: integer|Long expected";
        if (message.chainId != null && message.hasOwnProperty("chainId"))
            if (!$util.isString(message.chainId))
                return "chainId: string expected";
        if (message.hash != null && message.hasOwnProperty("hash"))
            if (!$util.isString(message.hash))
                return "hash: string expected";
        if (message.prevHash != null && message.hasOwnProperty("prevHash"))
            if (!$util.isString(message.prevHash))
                return "prevHash: string expected";
        if (message.signature != null && message.hasOwnProperty("signature"))
            if (!$util.isString(message.signature))
                return "signature: string expected";
        if (message.payload != null && message.hasOwnProperty("payload"))
            if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                return "payload: buffer expected";
        return null;
    };

    /**
     * Creates a BlockData message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof BlockData
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {BlockData} BlockData
     */
    BlockData.fromObject = function fromObject(object) {
        if (object instanceof $root.BlockData)
            return object;
        let message = new $root.BlockData();
        if (object.height != null)
            if ($util.Long)
                (message.height = $util.Long.fromValue(object.height)).unsigned = true;
            else if (typeof object.height === "string")
                message.height = parseInt(object.height, 10);
            else if (typeof object.height === "number")
                message.height = object.height;
            else if (typeof object.height === "object")
                message.height = new $util.LongBits(object.height.low >>> 0, object.height.high >>> 0).toNumber(true);
        if (object.time != null)
            if ($util.Long)
                (message.time = $util.Long.fromValue(object.time)).unsigned = true;
            else if (typeof object.time === "string")
                message.time = parseInt(object.time, 10);
            else if (typeof object.time === "number")
                message.time = object.time;
            else if (typeof object.time === "object")
                message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber(true);
        if (object.chainId != null)
            message.chainId = String(object.chainId);
        if (object.hash != null)
            message.hash = String(object.hash);
        if (object.prevHash != null)
            message.prevHash = String(object.prevHash);
        if (object.signature != null)
            message.signature = String(object.signature);
        if (object.payload != null)
            if (typeof object.payload === "string")
                $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
            else if (object.payload.length)
                message.payload = object.payload;
        return message;
    };

    /**
     * Creates a plain object from a BlockData message. Also converts values to other types if specified.
     * @function toObject
     * @memberof BlockData
     * @static
     * @param {BlockData} message BlockData
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    BlockData.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.height = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.height = options.longs === String ? "0" : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.time = options.longs === String ? "0" : 0;
            object.chainId = "";
            object.hash = "";
            object.prevHash = "";
            object.signature = "";
            if (options.bytes === String)
                object.payload = "";
            else {
                object.payload = [];
                if (options.bytes !== Array)
                    object.payload = $util.newBuffer(object.payload);
            }
        }
        if (message.height != null && message.hasOwnProperty("height"))
            if (typeof message.height === "number")
                object.height = options.longs === String ? String(message.height) : message.height;
            else
                object.height = options.longs === String ? $util.Long.prototype.toString.call(message.height) : options.longs === Number ? new $util.LongBits(message.height.low >>> 0, message.height.high >>> 0).toNumber(true) : message.height;
        if (message.time != null && message.hasOwnProperty("time"))
            if (typeof message.time === "number")
                object.time = options.longs === String ? String(message.time) : message.time;
            else
                object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber(true) : message.time;
        if (message.chainId != null && message.hasOwnProperty("chainId"))
            object.chainId = message.chainId;
        if (message.hash != null && message.hasOwnProperty("hash"))
            object.hash = message.hash;
        if (message.prevHash != null && message.hasOwnProperty("prevHash"))
            object.prevHash = message.prevHash;
        if (message.signature != null && message.hasOwnProperty("signature"))
            object.signature = message.signature;
        if (message.payload != null && message.hasOwnProperty("payload"))
            object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
        return object;
    };

    /**
     * Converts this BlockData to JSON.
     * @function toJSON
     * @memberof BlockData
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    BlockData.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return BlockData;
})();

export { $root as default };
