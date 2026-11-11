import {test} from 'node:test';
import assert from 'node:assert/strict';
import {inspect, describeSample, fileObservation} from '../src/source.mjs';
import {readFixture} from '../src/files.mjs';
const sample=await readFixture('gateway.log');
test('原件结构与错误边界',async()=>{

assert.equal(describeSample(sample).lineBreaks,3);
assert.throws(()=>describeSample(Buffer.from([255]),'utf-8'));
assert.throws(()=>describeSample(sample,'other'),/编码/);
const observed=await fileObservation(new URL('../fixtures/gateway.log',import.meta.url));assert.match(observed.identity,/^\d+:\d+$/);assert.deepEqual(observed.bytes,sample);

});
test('样本读取范围',async()=>{await assert.rejects(readFixture('../package.json'),/越界/);await assert.rejects(readFixture('absent.bin'),/ENOENT/);});
