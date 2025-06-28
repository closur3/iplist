<p align="center">
<a href="https://github.com/metowolf/iplist">
<img src="https://user-images.githubusercontent.com/2666735/50806883-84930c00-1333-11e9-869e-3c2f2664f154.png" />
</a>
</p>

<h1 align="center">IP 地址库</h1>

<p align="center">数据基于 OpenIPDB 分类</p>

<p align=center>
<a href="https://i-meto.com/">Author Website</a> ·
<a href="https://github.com/metowolf/iplist">Project Source</a> ·
<a href="https://twitter.com/metowolf">Twitter</a>
</p>

***

## 分类
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmetowolf%2Fiplist.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmetowolf%2Fiplist?ref=badge_shield)


### 省级 IP 段

特别剔除云服务商IP，采用 [行政区划代码](http://www.mca.gov.cn/article/sj/xzqh/2019/201901-06/201906211048.html) 进行分类。

|City|CIDR|
|---|---|
|中国|https://github.com/closur3/iplist/blob/master/data/cncity/100000.txt|
|浙江省|https://github.com/closur3/iplist/blob/master/data/cncity/330000.txt|
|广东省|https://github.com/closur3/iplist/blob/master/data/cncity/440000.txt|
||[ > 查看更多](https://github.com/closur3/iplist/tree/master/data/cncity)|

### 运营商 IP 段

|ISP|CIDR|
|---|---|
|中国电信|https://github.com/closur3/iplist/blob/master/data/isp/chinatelecom.txt|
|中国移动|https://github.com/closur3/iplist/blob/master/data/isp/chinamobile.txt|
|中国联通|https://github.com/closur3/iplist/blob/master/data/isp/chinaunicom.txt|
|彭博士|https://github.com/closur3/iplist/blob/master/data/isp/drpeng.txt|
|中国教育网|https://github.com/closur3/iplist/blob/master/data/isp/cernet.txt|
|中国科技网|https://github.com/closur3/iplist/blob/master/data/isp/cstnet.txt|

### 云厂商 IP 段

|ISP|CIDR|
|---|---|
|阿里云|https://github.com/closur3/iplist/blob/master/data/isp/aliyun.txt|
|腾讯云|https://github.com/closur3/iplist/blob/master/data/isp/tencent.txt|
|字节跳动|https://github.com/closur3/iplist/blob/master/data/isp/bytedance.txt|
|华为云|https://github.com/closur3/iplist/blob/master/data/isp/huawei.txt|
|Google Cloud|https://github.com/closur3/iplist/blob/master/data/isp/googlecloud.txt|

## 数据来源

|数据源|地址|
|---|---|
|OpenIPDB|https://openipdb.org/|
|IPinfo|https://ipinfo.io/|
|bgp.tools|https://bgp.tools/|


## 致谢

 - **特别感谢 [OpenIPDB.ipdb](https://www.npmjs.com/package/openipdb.ipdb) 项目，本列表直接采集于该数据库**
 - **特别感谢 [IPinfo](https://ipinfo.io) 提供的免费 ASN 数据用于修正**
 - 感谢 [fast-cidr-tools](https://github.com/SukkaW/fast-cidr-tools) 项目提供高效、可靠的 CIDR 合并工具
 - 感谢专注于 IP 数据库收集整理工作的公司和热心网友们


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmetowolf%2Fiplist.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmetowolf%2Fiplist?ref=badge_large)
